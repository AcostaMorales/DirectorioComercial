const mongoose = require('mongoose');

const NegocioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del negocio es requerido'],
    trim: true,
    maxlength: [100, 'El nombre del negocio no puede exceder 100 caracteres']
  },
  slug: {
    type: String,
    required: true,
    lowercase: true
  },
  url: {
    type: String,
    required: [true, 'La URL del negocio es requerida'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'La URL debe ser válida y comenzar con http:// o https://'
    }
  },
  imagen: {
    public_id: {
      type: String,
      required: [true, 'El public_id de Cloudinary es requerido']
    },
    secure_url: {
      type: String,
      required: [true, 'La URL segura de la imagen es requerida']
    }
  },
  estado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estado',
    required: [true, 'El estado es requerido']
  },
  municipio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Municipio',
    required: [true, 'El municipio es requerido']
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: [true, 'La categoría es requerida']
  },
  activo: {
    type: Boolean,
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índices para mejorar las consultas
NegocioSchema.index({ estado: 1, municipio: 1, categoria: 1 });
NegocioSchema.index({ categoria: 1 });
NegocioSchema.index({ nombre: 'text' }); // Para búsqueda de texto
NegocioSchema.index({ activo: 1 });

// Middleware para generar slug antes de guardar
NegocioSchema.pre('save', function(next) {
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

module.exports = mongoose.model('Negocio', NegocioSchema);