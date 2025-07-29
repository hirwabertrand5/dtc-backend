const express = require('express');
const router = express.Router();
const {
  getBuses,
  createBus,
  updateBus,
  deleteBus
} = require('../controllers/busController');

const { verifyToken } = require('../middleware/auth'); // ✅ You missed this part earlier
const Bus = require('../models/Bus'); // ✅ Needed for countDocuments()

// 🚍 Buses API Routes
router.get('/', verifyToken, getBuses);
router.post('/', verifyToken, createBus);
router.put('/:id', verifyToken, updateBus);
router.delete('/:id', verifyToken, deleteBus);

// ✅ NEW: Bus Count
router.get('/count', verifyToken, async (req, res) => {
  try {
    const total = await Bus.countDocuments();
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: "Failed to count buses" });
  }
});

module.exports = router;
