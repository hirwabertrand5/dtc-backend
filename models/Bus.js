const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['Standard', 'Mini', 'AC'],
    default: 'Standard'
  },
  status: {
    type: String,
    enum: ['Active', 'Idle', 'Maintenance', 'Out of Service'],
    default: 'Idle'
  },
  assignedCrew: {
    type: String,
    default: ''
  },
  assignedRoute: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);
