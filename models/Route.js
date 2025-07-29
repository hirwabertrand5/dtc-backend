const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: true,
    unique: true
  },
  routeNumber: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  estimatedTime: {
    type: String
  },
  geoPath: {
    type: {
      type: String,
      enum: ['LineString'],
      required: true
    },
    coordinates: {
      type: [[Number]], // Array of [lng, lat]
      required: true
    }
  },
  stops: [
    {
      name: String,
      location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point'
        },
        coordinates: {
          type: [Number] // [lng, lat]
        }
      }
    }
  ]
}, { timestamps: true });

routeSchema.index({ geoPath: '2dsphere' }); // Needed for spatial queries

module.exports = mongoose.model('Route', routeSchema);
