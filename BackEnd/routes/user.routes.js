const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);

router.post('/', userController.addUser);

router.post('/login', userController.login);

router.put('/add-image', userController.addImage);

router.put(
  '/add-phone-number',
  userController.addPhoneNumber,
);

module.exports = router;
