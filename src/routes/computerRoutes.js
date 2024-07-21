const express = require('express');
const router = express.Router();
const computerController = require('../controllers/computerController');

router.post('/', computerController.createComputer);
router.get('/', computerController.getAllComputers);
router.put('/:id', computerController.updateComputer);
router.delete('/:id', computerController.deleteComputer);
router.post('/:id/borrow', computerController.borrowComputer);
router.post('/:id/return', computerController.returnComputer);

module.exports = router;
