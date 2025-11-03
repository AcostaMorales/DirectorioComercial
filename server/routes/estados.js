const express = require('express');
const Estado = require('../models/Estado');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

// Obtener todos los estados (público)
router.get('/', async (req, res) => {
  try {
    const estados = await Estado.find().sort({ nombre: 1 });
    res.json(estados);
  } catch (error) {
    console.error('Error obteniendo estados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener estado por slug (público)
router.get('/:slug', async (req, res) => {
  try {
    const estado = await Estado.findOne({ slug: req.params.slug });
    if (!estado) {
      return res.status(404).json({ error: 'Estado no encontrado' });
    }
    res.json(estado);
  } catch (error) {
    console.error('Error obteniendo estado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crear nuevo estado (solo admin)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre del estado es requerido' });
    }

    const estadoExistente = await Estado.findOne({ 
      nombre: { $regex: new RegExp(`^${nombre}$`, 'i') }
    });

    if (estadoExistente) {
      return res.status(400).json({ error: 'Este estado ya existe' });
    }

    const estado = new Estado({ nombre });
    await estado.save();

    res.status(201).json({
      success: true,
      message: 'Estado creado correctamente',
      estado
    });
  } catch (error) {
    console.error('Error creando estado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar estado (solo admin)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre del estado es requerido' });
    }

    const estado = await Estado.findById(req.params.id);
    if (!estado) {
      return res.status(404).json({ error: 'Estado no encontrado' });
    }

    // Verificar que no exista otro estado con el mismo nombre
    const estadoExistente = await Estado.findOne({ 
      nombre: { $regex: new RegExp(`^${nombre}$`, 'i') },
      _id: { $ne: req.params.id }
    });

    if (estadoExistente) {
      return res.status(400).json({ error: 'Ya existe otro estado con este nombre' });
    }

    estado.nombre = nombre;
    await estado.save();

    res.json({
      success: true,
      message: 'Estado actualizado correctamente',
      estado
    });
  } catch (error) {
    console.error('Error actualizando estado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar estado (solo admin)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const estado = await Estado.findById(req.params.id);
    if (!estado) {
      return res.status(404).json({ error: 'Estado no encontrado' });
    }

    await Estado.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Estado eliminado correctamente'
    });
  } catch (error) {
    console.error('Error eliminando estado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;