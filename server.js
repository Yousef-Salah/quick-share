const express = require('express');
const mongoose = require('mongoose');
const DBURI = require('./config');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// app.use(bodyParser.json())


mongoose.set('strictQuery', false);
mongoose.connect(DBURI)
    .then(() => {
        app.listen(3000);
        console.log('connected')
    })
    .catch((err) => console.log(err));


app.use(session({secret : 'ilearnnodejs'}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());
    

require('./config/passport')(passport);
require('./routes/authRoutes')(app,passport);
    

app.get('/', (req, res) => {
    res.render('layouts/test');
});
