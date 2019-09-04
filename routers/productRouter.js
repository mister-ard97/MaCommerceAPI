const express = require('express');
const { productController } = require('../controllers');
const router = express.Router();

router.get('/allProduct', productController.getAllProducts);
router.get('/searchFilteredProduct', productController.getFilterProduct);

module.exports = router