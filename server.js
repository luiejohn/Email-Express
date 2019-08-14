const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send({'hi': 'asdasds'})
});


if ( process.env.NODE_ENV === 'production' ) {
    //Serve React App production assets
    app.use(express.static('client/build'));

    //server index.html for unknown server routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


const PORT = process.env.PORT || 5000;

app.listen( PORT , () => {
    console.log('listening');
})


