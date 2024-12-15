const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/register', userController.addUser);

router.post('/login', userController.login);

router.put('/add-image', userController.addImage);

router.put(
  '/add-phone-number',
  userController.addPhoneNumber,
);
router.post(
  '/forgetPassword',
  userController.forgetPassword,
);
router.patch(
  '/ResetPass/:token',
  userController.ResetPassword,
);

module.exports = router;
