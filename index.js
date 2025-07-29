const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const crewRoutes = require('./routes/crewRoutes');
const dutyRoutes = require('./routes/dutyRoutes');
const routeRoutes = require('./routes/routeRoutes'); // ✅ Added route planner API

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send("✅ DTC Backend API is working!");
});

// Register API Routes
app.use('/api/users', userRoutes);     // ✅ Login, JWT
app.use('/api/buses', busRoutes);      // ✅ Bus management
app.use('/api/crew', crewRoutes);      // ✅ Crew management
app.use('/api/duties', dutyRoutes);    // ✅ Duty assignment
app.use('/api/routes', routeRoutes);   // ✅ Route planner 🚍🗺️

// DB Connection + Start Server
const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
