const express = require('express');
const app = express();

require('./services/passport');

const authRoute = require('./routes/auth');
const publicRoute = require('./routes/public');
const privateRoute = require('./routes/private');


app.use(authRoute);
app.use(publicRoute);
app.use(privateRoute);


if ( process.env.NODE_ENV === 'production' ) {
    //Serve React App production assets
    app.use(express.static('client/build'));

    //Serve index.html for unknown server routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


const PORT = process.env.PORT || 5000;

app.listen( PORT , () => {
    console.log('listening');
})


