
// File: auth-service/routes/login.routes.js
const express = require('express');
const { loginUser } = require('../controllers/login.controller');
const router = express.Router();

router.post('/', loginUser);

module.exports = router;
