const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();

// ✅ CORS config with credentials support
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,               // Allow credentials (cookies or auth headers)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions)); // ✅ CORS middleware before everything else
app.use(express.json());
const registrationRoutes = require('./src/routes/registration.routes');

// Routes
app.use('/api/register', registrationRoutes);

// Server
const PORT = process.env.PORT || 5001;



// ✅ Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Registration Service running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
  }
};

startServer();







// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./src/config/db');
// const registrationRoutes = require('./src/routes/registration.routes');

// dotenv.config();

// const app = express();
// app.use(express.json());

// app.use(cors());

// connectDB();

// app.use('/api/register', registrationRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Registration Service running on port ${PORT}`));
