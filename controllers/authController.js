const User = require('../models/user');
const DBURI = require('../config');
const bcrypt = require('bcrypt');


const user_login_get = (req, res) => {
    res.render('auth/login');
}

const user_create_get = (req, res) => {
    res.render('auth/login');
};

const user_create_post = (req, res) => {

    console.log(req.body)

    const user = new User({
        name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
    });

    user.save()
        .then(() => {
            res.redirect('/login');
        })
        .catch((err) => console.log(err));
}

const user_login_post = (req, res) => {

    const MongoClient = require('mongodb').MongoClient;


    MongoClient.connect(DBURI, (err, db) => {
        if (err) res.redirect('/login');
            console.log('connected again')
        var dbo = db.db("quick-share");
        dbo.collection("users").findOne({ email: req.body.email }, (err, result) => {
            if (err) throw err;
            if(!result) return res.redirect('/login');
            db.close();

            bcrypt.compare(req.body.password, result.password, (err, isMatch) => {
                if (err) throw err;
                if (!isMatch) return res.redirect('/login');            
                return res.redirect('/');
        });
    })});



}



module.exports = {
    user_create_get,
    user_login_get,
    user_create_post,
    user_login_post
}