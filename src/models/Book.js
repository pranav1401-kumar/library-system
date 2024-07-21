const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true, required: true },
  available: { type: Boolean, default: true },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', default: null }
});

module.exports = mongoose.model('Book', bookSchema);
