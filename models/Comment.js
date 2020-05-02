const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId
    },
    book: {
        type: Schema.Types.ObjectId
    },
    text: {
        type: String,
        required: true
    },
    mark: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('comment', CommentSchema);