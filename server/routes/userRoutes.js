const express = require('express');
const { signIn, signUp } = require('../controllers/userController');

const router = express.Router();

// Sign-in route
router.post('/login', signIn);

// // TODO delete
router.get('/health', () => console.log("healthy"));

// Sign-up route
router.post('/signup', signUp);

module.exports = router;
