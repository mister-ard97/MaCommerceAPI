const express = require('express');
const { transactionController } = require('../controllers/index');
const { auth } = require('../helpers/auth');

const router = express.Router()

router.get('/getUserTransaction', auth, transactionController.getTransaction);
router.get('/getTransactionDetail/:id', auth, transactionController.getTransactionDetail)
router.post('/addTransaction', auth, transactionController.addTransaction);
router.post('/updatePaymentUser/:id', auth, transactionController.uploadPaymentUser)

module.exports = router;