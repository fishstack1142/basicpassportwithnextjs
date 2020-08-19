const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User;
// const validPassword = require('../lib/passwordUtils').validPassword;
const crypto = require('crypto');

const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
};

const verifyCallback = (username, password, done) => {

    User.findOne({ username: username })
        .then((user) => {

            if (!user) { return done(null, false) }
            
            const isValid = validatePassword(password, user.hash, user.salt);
            
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });

}

//customFIelds is from post requrest
const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

//used in session
//put in user to the session.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//grab out user from session
passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});

function validatePassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
  }