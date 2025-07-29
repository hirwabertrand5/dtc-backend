const express = require('express');
const router = express.Router();
const {
  getRoutes,
  createRoute
} = require('../controllers/routeController');

const { verifyToken } = require('../middleware/auth');
const Route = require('../models/Route');

// 🗺 Route API
router.get('/', verifyToken, getRoutes);
router.post('/', verifyToken, createRoute);

// ✅ Count
router.get('/count', verifyToken, async (req, res) => {
  try {
    const total = await Route.countDocuments();
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: "Failed to count routes" });
  }
});

module.exports = router;
