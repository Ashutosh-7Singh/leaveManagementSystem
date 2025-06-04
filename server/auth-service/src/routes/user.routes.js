const express = require('express');
const { getUser, updatePassword } = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Apply middleware
router.get('/me', authMiddleware, getUser);
router.put('/change-password', authMiddleware, updatePassword);

module.exports = router;
