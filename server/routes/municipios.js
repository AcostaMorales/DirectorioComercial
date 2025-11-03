const express = require('express');
const Municipio = require('../models/Municipio');
const Estado = require('../models/Estado');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

// Obtener municipios por estado (público)
router.get('/estado/:estadoSlug', async (req, res) => {
  try {
    const estado = await Estado.findOne({ slug: req.params.estadoSlug });
    if (!estado) {
      return res.status(404).json({ error: 'Estado no encontrado' });
    }

    const municipios = await Municipio.find({ estado: estado._id })
      .populate('estado', 'nombre slug')
      .sort({ nombre: 1 });

    res.json(municipios);
  } catch (error) {
    console.error('Error obteniendo municipios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener municipio específico (público)
router.get('/:slug', async (req, res) => {
  try {
    const municipio = await Municipio.findOne({ slug: req.params.slug })
      .populate('estado', 'nombre slug');
      
    if (!municipio) {
      return res.status(404).json({ error: 'Municipio no encontrado' });
    }
    res.json(municipio);
  } catch (error) {
    console.error('Error obteniendo municipio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crear nuevo municipio (solo admin)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { nombre, estadoId } = req.body;

    if (!nombre || !estadoId) {
      return res.status(400).json({ error: 'El nombre y el estado son requeridos' });
    }

    const estado = await Estado.findById(estadoId);
    if (!estado) {
      return res.status(404).json({ error: 'Estado no encontrado' });
    }

    // Verificar que no exista el municipio en ese estado
    const municipioExistente = await Municipio.findOne({ 
      nombre: { $regex: new RegExp(`^${nombre}$`, 'i') },
      estado: estadoId
    });

    if (municipioExistente) {
      return res.status(400).json({ error: 'Este municipio ya existe en el estado seleccionado' });
    }

    const municipio = new Municipio({ nombre, estado: estadoId });
    await municipio.save();

    const municipioPopulado = await Municipio.findById(municipio._id)
      .populate('estado', 'nombre slug');

    res.status(201).json({
      success: true,
      message: 'Municipio creado correctamente',
      municipio: municipioPopulado
    });
  } catch (error) {
    console.error('Error creando municipio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar municipio (solo admin)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { nombre, estadoId } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre del municipio es requerido' });
    }

    const municipio = await Municipio.findById(req.params.id);
    if (!municipio) {
      return res.status(404).json({ error: 'Municipio no encontrado' });
    }

    // Si se proporciona estadoId, verificar que existe
    if (estadoId) {
      const estado = await Estado.findById(estadoId);
      if (!estado) {
        return res.status(404).json({ error: 'Estado no encontrado' });
      }
      municipio.estado = estadoId;
    }

    // Verificar que no exista otro municipio con el mismo nombre en el estado
    const municipioExistente = await Municipio.findOne({ 
      nombre: { $regex: new RegExp(`^${nombre}$`, 'i') },
      estado: municipio.estado,
      _id: { $ne: req.params.id }
    });

    if (municipioExistente) {
      return res.status(400).json({ error: 'Ya existe otro municipio con este nombre en el estado' });
    }

    municipio.nombre = nombre;
    await municipio.save();

    const municipioPopulado = await Municipio.findById(municipio._id)
      .populate('estado', 'nombre slug');

    res.json({
      success: true,
      message: 'Municipio actualizado correctamente',
      municipio: municipioPopulado
    });
  } catch (error) {
    console.error('Error actualizando municipio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar municipio (solo admin)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const municipio = await Municipio.findById(req.params.id);
    if (!municipio) {
      return res.status(404).json({ error: 'Municipio no encontrado' });
    }

    await Municipio.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Municipio eliminado correctamente'
    });
  } catch (error) {
    console.error('Error eliminando municipio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;