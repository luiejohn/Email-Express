const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//'user' argument passed after verifying user (from the process below)
passport.serializeUser( (user, done) => {
    //user.id is the mongoDB ObjectID, shortcut instead of _id on Mongo
    done(null, user.id);
});

passport.deserializeUser( (id, done) => {
    User.findById(id).then( user => {
        done(null, user);
    })
});

passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },       
        ( accessToken, refreshToken, profile, done ) => {
            //verify if the user is new or already exist
            User.findOne({ googleId: profile.id }).then( (existingUser) => {
                if(existingUser){
                    //user already existed
                    done(null, existingUser);
                } else {
                    //create a new record & save to database
                    new User({ 
                        googleId: profile.id,
                    }).save().then( user => {
                        done(null, existingUser);
                    });
                }
            })

        }
));