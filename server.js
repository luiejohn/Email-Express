const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// const publicRoute = require('./routes/public');
// const privateRoute = require('./routes/private');


passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },       
        ( accessToken, refreshToken, profile, done ) => {
            console.log(accessToken);
        }
));

//follow up request to get user data
//google  = google strategy
app.get(
    '/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

//callback url + google code
//goes back to GoogleStrategy and execute callback function
app.get('/auth/google/callback', passport.authenticate('google'));


// app.use(publicRoute);
// app.use(privateRoute);



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


