// File: auth-service/routes/logout.routes.js
const express = require('express');
const { logoutUser } = require('../controllers/logout.controller');
const router = express.Router();

router.post('/', logoutUser);

module.exports = router;
