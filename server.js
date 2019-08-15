const express = require('express');
const mongoose = require('mongoose');
const app = express();
const keys = require('./config/keys');


const cookieSession = require('cookie-session');
const passport = require('passport');

//ORDER MATTERS
require('./model/User');
require('./services/passport');

const authRoute = require('./routes/auth');
const publicRoute = require('./routes/public');
const privateRoute = require('./routes/private');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.use(authRoute);
app.use(publicRoute);
app.use(privateRoute);

//to create cookie
app.use(
    cookieSession({
      maxAge: 30 * 30 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
    })
  );

//Use Cookie
app.use(passport.initialize());
app.use(passport.session());



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


