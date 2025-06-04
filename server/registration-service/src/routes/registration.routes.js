// File: registration-service/routes/registration.routes.js
const express = require('express');
const { registerUser } = require('../controllers/registration.controller');
const router = express.Router();

router.post('/', registerUser);

module.exports = router;
