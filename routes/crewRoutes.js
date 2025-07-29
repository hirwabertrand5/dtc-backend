const express = require('express');
const router = express.Router();
const {
  getAllCrew,
  createCrew,
  updateCrew,
  deleteCrew
} = require('../controllers/crewController');

const { verifyToken } = require('../middleware/auth');
const Crew = require('../models/Crew'); // ✅ Needed for count

// 👷 Crew API Routes
router.get('/', verifyToken, getAllCrew);
router.post('/', verifyToken, createCrew);
router.put('/:id', verifyToken, updateCrew);
router.delete('/:id', verifyToken, deleteCrew);

// ✅ Count
router.get('/count', verifyToken, async (req, res) => {
  try {
    const total = await Crew.countDocuments();
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: "Failed to count crew" });
  }
});

module.exports = router;
