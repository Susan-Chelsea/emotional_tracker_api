
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define route for getting notes
router.get('/getAllUsers', userController.getAllUsers);

router.get('/user/:id', userController.getUserById);

router.get('/user', userController.getUserByUserName);

router.put('/addUser', userController.addUser);

module.exports = router;