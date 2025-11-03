const mongoose = require('mongoose');

const EstadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del estado es requerido'],
    unique: true,
    trim: true,
    maxlength: [50, 'El nombre del estado no puede exceder 50 caracteres']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  }
}, {
  timestamps: true
});

// Middleware para generar slug antes de guardar
EstadoSchema.pre('save', function(next) {
  if (this.isModified('nombre')) {
    this.slug = this.nombre
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[áàäâ]/g, 'a')
      .replace(/[éèëê]/g, 'e')
      .replace(/[íìïî]/g, 'i')
      .replace(/[óòöô]/g, 'o')
      .replace(/[úùüû]/g, 'u')
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9]/g, '');
  }
  next();
});

module.exports = mongoose.model('Estado', EstadoSchema);