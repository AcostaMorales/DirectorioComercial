const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la categoría es requerido'],
    trim: true,
    maxlength: [50, 'El nombre de la categoría no puede exceder 50 caracteres']
  },
  slug: {
    type: String,
    required: true,
    lowercase: true
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: [200, 'La descripción no puede exceder 200 caracteres']
  },
  icono: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Índice único para el nombre de la categoría
CategoriaSchema.index({ nombre: 1 }, { unique: true });

// Middleware para generar slug antes de guardar
CategoriaSchema.pre('save', function(next) {
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

module.exports = mongoose.model('Categoria', CategoriaSchema);