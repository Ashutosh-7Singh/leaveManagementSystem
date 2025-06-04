const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createLeave, getAllLeaves } = require('../controllers/leaves.controller');
const { getUserLeaves } = require('../controllers/leaves.controller');

router.post('/create', authMiddleware, createLeave); // Admin only
router.get('/all', authMiddleware, getAllLeaves);    
router.get('/user', authMiddleware, getUserLeaves);

module.exports = router;



