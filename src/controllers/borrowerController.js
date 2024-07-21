const Borrower = require('../models/Borrower');

exports.createBorrower = async (req, res) => {
  const borrower = new Borrower(req.body);
  try {
    await borrower.save();
    res.status(201).send(borrower);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.find().populate('borrowedBooks borrowedComputers');
    res.send(borrowers);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!borrower) {
      return res.status(404).send();
    }
    res.send(borrower);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.findByIdAndDelete(req.params.id);
    if (!borrower) {
      return res.status(404).send();
    }
    res.send(borrower);
  } catch (err) {
    res.status(500).send(err);
  }
};
