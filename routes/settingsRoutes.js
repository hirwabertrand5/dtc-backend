const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const ctrl = require('../controllers/settingsController');

// Get latest settings (auto-creates defaults on first call)
router.get('/', verifyToken, ctrl.getSettings);

// Update settings (upsert)
router.put('/', verifyToken, /* requireAdmin, */ ctrl.updateSettings);

module.exports = router;