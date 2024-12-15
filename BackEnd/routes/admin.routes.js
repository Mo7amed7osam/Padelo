const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.delete('/users/:userEmail', authMiddleware, adminController.deleteUser);

router.put('/courts/:courtId/price', authMiddleware, adminController.updateCourtPrice);

router.put('/users/:userId/allUsers', authMiddleware, adminController.getAllUsers);

module.exports = router;