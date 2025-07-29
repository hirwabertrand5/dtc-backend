const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Driver', 'Conductor'],
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'On Duty', 'Resting'],
    default: 'Available'
  },
  assignedBus: {
    type: String,
    default: ''
  },
  lastDutyEnd: {
    type: Date,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Crew', crewSchema);
