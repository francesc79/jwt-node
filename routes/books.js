const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const { Book, validate } = require('../models/book');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const books = await Book.getBooks();
    res.send(books);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let book = new Book({ name: req.body.name });
    book = await book.save();

    res.send(book);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).send('The book with the given ID was not found.');

    res.send(book);
});

module.exports = router;