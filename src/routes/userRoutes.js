const apiAuthMiddleware = require('../middleware/api-auth');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getAllUsers', apiAuthMiddleware.isAuthenticated, userController.getAllUsers);

router.get('/user/:id', userController.getUserById);

router.post('/addUser', userController.addUser);

module.exports = router;