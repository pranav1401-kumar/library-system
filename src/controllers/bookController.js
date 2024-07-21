const Book = require('../models/Book');
const Borrower = require('../models/Borrower');

exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.status(201).send(book);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || !book.available) {
      return res.status(404).send({ error: 'Book not available' });
    }
    const borrower = await Borrower.findById(req.body.borrowerId);
    if (!borrower) {
      return res.status(404).send({ error: 'Borrower not found' });
    }
    book.available = false;
    book.borrower = borrower._id;
    borrower.borrowedBooks.push(book._id);
    await book.save();
    await borrower.save();
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.available) {
      return res.status(404).send({ error: 'Book not borrowed' });
    }
    const borrower = await Borrower.findById(book.borrower);
    book.available = true;
    book.borrower = null;
    borrower.borrowedBooks.pull(book._id);
    await book.save();
    await borrower.save();
    res.send(book);
  } catch (err) {
    res.status(500).send(err);
  }
};
