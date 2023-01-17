const LocalStrategy = require('passport-local').Strategy;

let User = require('../models/user');

module.exports = (passport) => {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(() => {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);
                newUser.name     = req.body.user_name;

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

    passport.use('loacl-login', new LocalStrategy( {
        usernameField: 'email', 
        passwordField: 'password',

    },(email, password, done) => {
        console.log('local')
            User.findOne({ 'email' : email }, (err, user) => {
                if(err) return done(err);
                if(!user) return done(null, false, "Invalid Email Address!! :(");
                if(!user.validPassword(password)) return done(null, false, "Incorrect password");
                return done(null, user);
            });
    }));
}