const express = require('express');
const router = express.Router();

const passport = require('passport');

//follow up request to get user data
//google  = google strategy
router.get(
    '/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

//callback url + google code
//goes back to GoogleStrategy and execute callback function
router.get('/auth/google/callback', passport.authenticate('google'));


module.exports = router;



