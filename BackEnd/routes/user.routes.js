const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');


router.get('/users', userController.getAllUsers);


router.post('/users', userController.createUser);


router.post('/users/login', userController.loginUser);


router.put('/users/add-image', userController.addImage);


router.put('/users/add-phone-number', userController.addPhoneNumber);

module.exports = router;
