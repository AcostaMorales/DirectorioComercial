const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: [true, 'El deviceId es requerido'],
    unique: true,
    trim: true
  },
  pushToken: {
    type: String,
    trim: true
  },
  platform: {
    type: String,
    enum: ['web', 'android', 'ios'],
    default: 'web'
  },
  activo: {
    type: Boolean,
    default: true
  },
  ultimaActividad: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índice para consultas rápidas
DeviceSchema.index({ deviceId: 1 });
DeviceSchema.index({ activo: 1 });

module.exports = mongoose.model('Device', DeviceSchema);