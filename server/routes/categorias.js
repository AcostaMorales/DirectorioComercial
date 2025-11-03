const express = require('express');
const Categoria = require('../models/Categoria');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

// Obtener todas las categorías (público)
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ nombre: 1 });
    res.json(categorias);
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener categoría por slug (público)
router.get('/:slug', async (req, res) => {
  try {
    const categoria = await Categoria.findOne({ slug: req.params.slug });
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    console.error('Error obteniendo categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crear nueva categoría (solo admin)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, icono } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre de la categoría es requerido' });
    }

    const categoriaExistente = await Categoria.findOne({ 
      nombre: { $regex: new RegExp(`^${nombre}$`, 'i') }
    });

    if (categoriaExistente) {
      return res.status(400).json({ error: 'Esta categoría ya existe' });
    }

    const categoria = new Categoria({ nombre, descripcion, icono });
    await categoria.save();

    res.status(201).json({
      success: true,
      message: 'Categoría creada correctamente',
      categoria
    });
  } catch (error) {
    console.error('Error creando categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar categoría (solo admin)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, icono } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre de la categoría es requerido' });
    }

    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    // Verificar que no exista otra categoría con el mismo nombre
    const categoriaExistente = await Categoria.findOne({ 
      nombre: { $regex: new RegExp(`^${nombre}$`, 'i') },
      _id: { $ne: req.params.id }
    });

    if (categoriaExistente) {
      return res.status(400).json({ error: 'Ya existe otra categoría con este nombre' });
    }

    categoria.nombre = nombre;
    categoria.descripcion = descripcion;
    categoria.icono = icono;
    await categoria.save();

    res.json({
      success: true,
      message: 'Categoría actualizada correctamente',
      categoria
    });
  } catch (error) {
    console.error('Error actualizando categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar categoría (solo admin)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    await Categoria.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Categoría eliminada correctamente'
    });
  } catch (error) {
    console.error('Error eliminando categoría:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;