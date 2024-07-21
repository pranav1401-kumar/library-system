const mongoose = require('mongoose');

const computerSchema = new mongoose.Schema({
  serialNumber: { type: String, unique: true, required: true },
  status: { type: String, enum: ['available', 'in-use', 'under-maintenance'], default: 'available' },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', default: null }
});

module.exports = mongoose.model('Computer', computerSchema);
