const Crew = require('../models/Crew');

// GET All Crew
exports.getAllCrew = async (req, res) => {
  try {
    const crew = await Crew.find();
    res.status(200).json(crew);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST New Crew Member
exports.createCrew = async (req, res) => {
  const { name, role, status, assignedBus } = req.body;

  try {
    const crew = new Crew({ name, role, status, assignedBus });
    await crew.save();
    res.status(201).json(crew);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT Update Crew (status, assigned bus, etc.)
exports.updateCrew = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await Crew.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Crew Member (optional)
exports.deleteCrew = async (req, res) => {
  const { id } = req.params;

  try {
    await Crew.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Crew removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
