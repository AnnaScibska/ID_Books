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
            // const user = await User.findById(req.user.id).select('-password');
            // TODO: after book created -> add to user.books
            // in user ??

            const newBook = new Book({
                title: req.body.title,
                author: req.body.author,
                isbn: req.body.isbn,
                description: req.body.description,
                year: req.body.year,
                imageUrl: req.body.imageUrl
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
        const books = await Book.find().sort({ date: -1 });
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


// TODO: IS NEEDED??

// @route    DELETE api/books/:id
// @desc     Delete a book
// @access   Private
// router.delete('/:id', auth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);

//         // Check for ObjectId format and post
//         if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
//             return res.status(404).json({ msg: 'Post not found' });
//         }

//         // Check user
//         if (post.user.toString() !== req.user.id) {
//             return res.status(401).json({ msg: 'User not authorized' });
//         }

//         await post.remove();

//         res.json({ msg: 'Post removed' });
//     } catch (err) {
//         console.error(err.message);

//         res.status(500).send('Server Error');
//     }
// });

// // @route    PUT api/books/add/:id
// // @desc     Like a post
// // @access   Private
// router.put('/add/:id', auth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);

//         // Check if the post has already been liked
//         if (post.likes.some(like => like.user.toString() === req.user.id)) {
//             return res.status(400).json({ msg: 'Post already liked' });
//         }

//         post.likes.unshift({ user: req.user.id });

//         await post.save();

//         return res.json(post.likes);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // @route    PUT api/posts/unlike/:id
// // @desc     Unlike a post
// // @access   Private
// router.put('/unlike/:id', auth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);

//         // Check if the post has already been liked
//         if (!post.likes.some(like => like.user.toString() === req.user.id)) {
//             return res.status(400).json({ msg: 'Post has not yet been liked' });
//         }

//         // remove the like
//         post.likes = post.likes.filter(
//             ({ user }) => user.toString() !== req.user.id
//         );

//         await post.save();

//         return res.json(post.likes);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // @route    POST api/posts/comment/:id
// // @desc     Comment on a post
// // @access   Private
// router.post(
//     '/comment/:id',
//     [
//         auth,
//         [
//             check('text', 'Text is required')
//                 .not()
//                 .isEmpty()
//         ]
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         try {
//             const user = await User.findById(req.user.id).select('-password');
//             const post = await Post.findById(req.params.id);

//             const newComment = {
//                 text: req.body.text,
//                 name: user.name,
//                 avatar: user.avatar,
//                 user: req.user.id
//             };

//             post.comments.unshift(newComment);

//             await post.save();

//             res.json(post.comments);
//         } catch (err) {
//             console.error(err.message);
//             res.status(500).send('Server Error');
//         }
//     }
// );

// // @route    DELETE api/posts/comment/:id/:comment_id
// // @desc     Delete comment
// // @access   Private
// router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);

//         // Pull out comment
//         const comment = post.comments.find(
//             comment => comment.id === req.params.comment_id
//         );
//         // Make sure comment exists
//         if (!comment) {
//             return res.status(404).json({ msg: 'Comment does not exist' });
//         }
//         // Check user
//         if (comment.user.toString() !== req.user.id) {
//             return res.status(401).json({ msg: 'User not authorized' });
//         }

//         post.comments = post.comments.filter(
//             ({ id }) => id !== req.params.comment_id
//         );

//         await post.save();

//         return res.json(post.comments);
//     } catch (err) {
//         console.error(err.message);
//         return res.status(500).send('Server Error');
//     }
// });

module.exports = router;