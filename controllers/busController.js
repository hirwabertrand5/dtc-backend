const Bus = require('../models/Bus');

// GET: All Buses
exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: Create a new Bus
exports.createBus = async (req, res) => {
  const { busNumber, capacity, type, status, assignedCrew, assignedRoute } = req.body;

  try {
    const exists = await Bus.findOne({ busNumber });
    if (exists) return res.status(400).json({ msg: 'Bus number already exists' });

    const bus = new Bus({ busNumber, capacity, type, status, assignedCrew, assignedRoute });
    await bus.save();
    res.status(201).json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT: Update a bus
exports.updateBus = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBus = await Bus.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedBus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: Remove a bus (optional)
exports.deleteBus = async (req, res) => {
  const { id } = req.params;

  try {
    await Bus.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Bus deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
