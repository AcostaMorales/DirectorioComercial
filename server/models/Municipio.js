const mongoose = require('mongoose');

const MunicipioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del municipio es requerido'],
    trim: true,
    maxlength: [80, 'El nombre del municipio no puede exceder 80 caracteres']
  },
  slug: {
    type: String,
    required: true,
    lowercase: true
  },
  estado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estado',
    required: [true, 'El estado es requerido']
  }
}, {
  timestamps: true
});

// Índice compuesto para asegurar que no haya municipios duplicados en el mismo estado
MunicipioSchema.index({ nombre: 1, estado: 1 }, { unique: true });

// Middleware para generar slug antes de guardar
MunicipioSchema.pre('save', function(next) {
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

module.exports = mongoose.model('Municipio', MunicipioSchema);