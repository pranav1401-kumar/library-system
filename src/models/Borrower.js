const mongoose = require('mongoose');

const borrowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  borrowedComputers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Computer' }]
});

module.exports = mongoose.model('Borrower', borrowerSchema);
