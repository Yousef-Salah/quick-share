const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique : true,
        dropDups: true // drop duplicate records
    },
    password: {
        type: String,
        required: true,
    }
    // ! complete for auth functionality 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;