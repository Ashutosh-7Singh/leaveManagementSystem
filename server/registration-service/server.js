


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const registrationRoutes = require('./src/routes/registration.routes');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

connectDB();

app.use('/api/register', registrationRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Registration Service running on port ${PORT}`));
