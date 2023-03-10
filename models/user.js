const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

// userSchema.pre('save', (next) => {
    
//     let user = this;

//     // only hash the password if it has been modified (or is new)
//     // if (!user.isModified('password')) return next();

//     // generate a salt
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) return next(err);

//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) return next(err);
//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// });

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};



const User = mongoose.model('User', userSchema);
module.exports = User;