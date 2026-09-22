const express = require('express');

const {
    registerUser,
    loginUser
} = require('../controllers/authController');

const router = express.Router();

// POST - Register a new user
router.post('/register', registerUser);

// POST - Login user
router.post('/login', loginUser);

module.exports = router;