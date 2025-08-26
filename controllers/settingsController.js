const AdminSettings = require('../models/AdminSettings');

// Return the latest settings or create defaults on first call
exports.getSettings = async (req, res) => {
  try {
    let doc = await AdminSettings.findOne().sort({ createdAt: -1 });
    if (!doc) doc = await AdminSettings.create({});
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Update settings (upsert)
exports.updateSettings = async (req, res) => {
  try {
    const payload = req.body || {};
    const updated = await AdminSettings.findOneAndUpdate({}, payload, { new: true, upsert: true });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};