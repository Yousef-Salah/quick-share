const express = require('express');
const mongoose = require('mongoose');
const DBURI = require('./config');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect(DBURI)
    .then(() => {
        app.listen(3000);
        console.log('connected')
    })
    .catch((err) => console.log(err));

app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.render('layouts/test');
});
