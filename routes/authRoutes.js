// const express = require('express');
// const authController = require('../controllers/authController');

// const router = express.Router();

// router.get('/register', authController.user_create_get);

// router.post('/user/create', authController.user_create_post);

// router.post('/user/login', authController.user_login_post);

// module.exports = router;

module.exports = function(app,passport){

    app.get('/login', (req, res) => {
        res.render('auth/login');
    });

    app.post('/user/login', passport.authenticate('loacl-login', {
        successRedirect: '/',
        failureRedirect: '/login',
    }), () => {
        console.log('post')
    });

    app.get('/',isLoggedIn,(req,res)=>{
        res.render('layouts/test',{
            user : req.user
        });
    });

    app.get('/signup',(req,res) => {
        res.render('auth/login');
    })

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true, // allow flash messages
        session: false
    }));

    app.post('/logout', (req, res) => {
        req.logout(err => {
            if(err) throw err;
            res.redirect('/');
        });
    });


        // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/login');
    }
}
