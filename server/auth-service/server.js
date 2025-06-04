const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Route imports
const authRoutes = require('./src/routes/login.routes');
const logoutRoutes = require('./src/routes/logout.routes');
const userRoutes = require('./src/routes/user.routes');
const leaveRoutes = require('./src/routes/leaves.routes');
const leaveApplicationRoutes = require('./src/routes/leaveApplication.routes');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORS config (with credentials support for cookies)
const corsOptions = {
  origin: 'http://localhost:5173', // frontend origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Route mounting
app.use('/api/login', authRoutes);
app.use('/api/logout', logoutRoutes);
app.use('/api/user', userRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/leave-applications', leaveApplicationRoutes);

// Start server only after DB is connected
const PORT = process.env.PORT || 5003;

const startServer = async () => {
  try {
    await connectDB(); // ⏳ Wait for DB to connect
    app.listen(PORT, () => {
      console.log(`Auth Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
  }
};

startServer();
