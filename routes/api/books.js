const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Book = require('../../models/Book');
const User = require('../../models/User');

// @route    POST api/books
// @desc     Create a book
// @access   Private -> needs to be logged to use it
router.post(
    '/',
    [
        auth,
        [
            check('title', 'Title is required')
                .not()
                .isEmpty(),
            check('author', 'Author is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const newBook = new Book({
                title: req.body.title,
                author: req.body.author,
                isbn: req.body.isbn,
                description: req.body.description,
                year: req.body.year,
                imageUrl: req.body.imageUrl,
                comment: req.body.comment || '',
                user_id: user._id
            });

            const book = await newBook.save();

            res.json(book);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('tutej Server Error');
        }
    }
);

// @route    GET api/books
// @desc     Get all books
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const books = await Book.find({ user_id: user._id }).sort({ date: -1 });
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/books/:id
// @desc     Get book by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        // Check for ObjectId format and book
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        res.json(book);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/books/:id
// @desc     Delete a book by ID
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        
        // Check for ObjectId format and book
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        // Check user
        const user = await User.findById(req.user.id).select('-password');
        if (book.user_id != user._id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await book.remove();

        res.json({ msg: 'Book removed' });
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
});

// @route    PUT api/books/:id
// @desc     Update book by ID
// @access   Private
router.put('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        // Check for ObjectId format and book
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        // Check user
        const user = await User.findById(req.user.id).select('-password');
        if (book.user_id != user._id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        book.comment = req.body.comment;

        await book.save();

        return res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;