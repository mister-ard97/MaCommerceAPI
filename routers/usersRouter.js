const express = require('express');
const { usersController } = require('../controllers');
const { auth } = require('../helpers/auth');

const router = express.Router();

router.post('/userRegister', usersController.register);
router.put('/userEmailVerification', auth, usersController.emailVerification);
router.post('/userResendEmailVerification', usersController.resendEmailVerification);
router.post('/userKeepLogin', auth, usersController.keepLoginUser);
router.post('/userLogin', usersController.userLogin);
router.get('/userWishlistProduct/:id', auth, usersController.userWishlistProduct);
router.post('/userToggleWishlist/:id', auth, usersController.userToggleWishlistProduct);

module.exports = router;


