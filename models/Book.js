const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String
    },
    description: {
        type: String
    },
    year: {
        type: String
    },
    imageUrl: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: String
    },
    comment: {
        type: String
    }
});

module.exports = mongoose.model('book', BookSchema);