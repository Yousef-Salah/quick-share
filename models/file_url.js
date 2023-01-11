const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileUrlSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    file_id: {
        type: String,
        required: true,    
    },
    url: {
        type: String,
        required: true,
    }, 
    is_reusable: {
        type: Boolean, 
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const FileUrl = mongoose.model('file_url', fileUrlSchema);
module.exports = FileUrl;