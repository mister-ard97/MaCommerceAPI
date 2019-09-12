const express = require('express');
const { transactionController } = require('../controllers/index');
const { auth } = require('../helpers/auth');

const router = express.Router()

router.post('/addTransaction', auth, transactionController.addTransaction);

module.exports = router;