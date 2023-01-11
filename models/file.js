const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    file_path: {
        type: String, 
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['private', 'public'],
    },
    file_name: {
        type: String,
        required: true,
    },
    file: {
        data: Buffer,
        contentType: String
    },
    description: {
        type: String, 
        required: true,
    },
    owner_id: {
        type: String, 
        required: true,
    },
    number_of_downloads: {
        type: Number,
        required: true,
        default: 0,
    },
    soft_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);
module.exports = File;