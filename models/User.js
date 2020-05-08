const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    books: [
        {
            book: {
                type: Schema.Types.ObjectId,
                ref: 'books'
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = User = mongoose.model('user', UserSchema);