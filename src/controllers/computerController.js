const Computer = require('../models/Computer');
const Borrower = require('../models/Borrower');

exports.createComputer = async (req, res) => {
  const computer = new Computer(req.body);
  try {
    await computer.save();
    res.status(201).send(computer);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllComputers = async (req, res) => {
  try {
    const computers = await Computer.find();
    res.send(computers);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateComputer = async (req, res) => {
  try {
    const computer = await Computer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!computer) {
      return res.status(404).send();
    }
    res.send(computer);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteComputer = async (req, res) => {
  try {
    const computer = await Computer.findByIdAndDelete(req.params.id);
    if (!computer) {
      return res.status(404).send();
    }
    res.send(computer);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.borrowComputer = async (req, res) => {
  try {
    const computer = await Computer.findById(req.params.id);
    if (!computer || computer.status !== 'available') {
      return res.status(404).send({ error: 'Computer not available' });
    }
    const borrower = await Borrower.findById(req.body.borrowerId);
    if (!borrower) {
      return res.status(404).send({ error: 'Borrower not found' });
    }
    computer.status = 'in-use';
    computer.borrower = borrower._id;
    borrower.borrowedComputers.push(computer._id);
    await computer.save();
    await borrower.save();
    res.send(computer);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.returnComputer = async (req, res) => {
  try {
    const computer = await Computer.findById(req.params.id);
    if (!computer || computer.status !== 'in-use') {
      return res.status(404).send({ error: 'Computer not borrowed' });
    }
    const borrower = await Borrower.findById(computer.borrower);
    computer.status = 'available';
    computer.borrower = null;
    borrower.borrowedComputers.pull(computer._id);
    await computer.save();
    await borrower.save();
    res.send(computer);
  } catch (err) {
    res.status(500).send(err);
  }
};
