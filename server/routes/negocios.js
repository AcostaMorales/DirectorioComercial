const express = require('express');
const Negocio = require('../models/Negocio');
const Estado = require('../models/Estado');
const Municipio = require('../models/Municipio');
const Categoria = require('../models/Categoria');
const { authenticateAdmin } = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

const router = express.Router();

// Obtener negocios con filtros (público)
router.get('/', async (req, res) => {
  try {
    const { 
      categoria, 
      estado, 
      municipio, 
      busqueda, 
      letra, 
      page = 1, 
      limit = 20 
    } = req.query;

    let filtros = { activo: true };
    let sort = { nombre: 1 };

    // Filtro por categoría
    if (categoria) {
      const categoriaDoc = await Categoria.findOne({ slug: categoria });
      if (categoriaDoc) {
        filtros.categoria = categoriaDoc._id;
      }
    }

    // Filtro por estado
    if (estado) {
      const estadoDoc = await Estado.findOne({ slug: estado });
      if (estadoDoc) {
        filtros.estado = estadoDoc._id;
      }
    }

    // Filtro por municipio
    if (municipio) {
      const municipioDoc = await Municipio.findOne({ slug: municipio });
      if (municipioDoc) {
        filtros.municipio = municipioDoc._id;
      }
    }

    // Filtro por búsqueda de texto
    if (busqueda) {
      filtros.$text = { $search: busqueda };
      sort = { score: { $meta: 'textScore' } };
    }

    // Filtro por letra inicial
    if (letra) {
      filtros.nombre = { $regex: new RegExp(`^${letra}`, 'i') };
    }

    const skip = (page - 1) * limit;

    const negocios = await Negocio.find(filtros)
      .populate('estado', 'nombre slug')
      .populate('municipio', 'nombre slug')
      .populate('categoria', 'nombre slug')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Negocio.countDocuments(filtros);

    res.json({
      negocios,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error obteniendo negocios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener negocios por ubicación específica (público)
router.get('/ubicacion/:estadoSlug/:municipioSlug', async (req, res) => {
  try {
    const { estadoSlug, municipioSlug } = req.params;
    const { categoria } = req.query;

    const estado = await Estado.findOne({ slug: estadoSlug });
    const municipio = await Municipio.findOne({ slug: municipioSlug });

    if (!estado || !municipio) {
      return res.status(404).json({ error: 'Estado o municipio no encontrado' });
    }

    let filtros = { 
      estado: estado._id, 
      municipio: municipio._id, 
      activo: true 
    };

    if (categoria) {
      const categoriaDoc = await Categoria.findOne({ slug: categoria });
      if (categoriaDoc) {
        filtros.categoria = categoriaDoc._id;
      }
    }

    const negocios = await Negocio.find(filtros)
      .populate('estado', 'nombre slug')
      .populate('municipio', 'nombre slug')
      .populate('categoria', 'nombre slug')
      .sort({ nombre: 1 });

    res.json(negocios);
  } catch (error) {
    console.error('Error obteniendo negocios por ubicación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener categorías disponibles por ubicación (público)
router.get('/categorias-ubicacion/:estadoSlug/:municipioSlug', async (req, res) => {
  try {
    const { estadoSlug, municipioSlug } = req.params;

    const estado = await Estado.findOne({ slug: estadoSlug });
    const municipio = await Municipio.findOne({ slug: municipioSlug });

    if (!estado || !municipio) {
      return res.status(404).json({ error: 'Estado o municipio no encontrado' });
    }

    const categorias = await Negocio.distinct('categoria', {
      estado: estado._id,
      municipio: municipio._id,
      activo: true
    });

    const categoriasPopuladas = await Categoria.find({
      _id: { $in: categorias }
    }).sort({ nombre: 1 });

    res.json(categoriasPopuladas);
  } catch (error) {
    console.error('Error obteniendo categorías por ubicación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Crear nuevo negocio (solo admin)
router.post('/', authenticateAdmin, upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, url, estadoId, municipioId, categoriaId } = req.body;

    if (!nombre || !url || !estadoId || !municipioId || !categoriaId) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos: nombre, url, estado, municipio, categoría' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'La imagen es requerida' });
    }

    // Verificar que existan las referencias
    const estado = await Estado.findById(estadoId);
    const municipio = await Municipio.findById(municipioId);
    const categoria = await Categoria.findById(categoriaId);

    if (!estado || !municipio || !categoria) {
      return res.status(404).json({ error: 'Estado, municipio o categoría no encontrados' });
    }

    const negocio = new Negocio({
      nombre,
      url,
      estado: estadoId,
      municipio: municipioId,
      categoria: categoriaId,
      imagen: {
        public_id: req.file.public_id,
        secure_url: req.file.secure_url
      }
    });

    await negocio.save();

    const negocioPopulado = await Negocio.findById(negocio._id)
      .populate('estado', 'nombre slug')
      .populate('municipio', 'nombre slug')
      .populate('categoria', 'nombre slug');

    res.status(201).json({
      success: true,
      message: 'Negocio creado correctamente',
      negocio: negocioPopulado
    });
  } catch (error) {
    console.error('Error creando negocio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar negocio (solo admin)
router.put('/:id', authenticateAdmin, upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, url, estadoId, municipioId, categoriaId, activo } = req.body;

    const negocio = await Negocio.findById(req.params.id);
    if (!negocio) {
      return res.status(404).json({ error: 'Negocio no encontrado' });
    }

    // Actualizar campos básicos
    if (nombre) negocio.nombre = nombre;
    if (url) negocio.url = url;
    if (activo !== undefined) negocio.activo = activo === 'true';

    // Verificar y actualizar referencias si se proporcionan
    if (estadoId) {
      const estado = await Estado.findById(estadoId);
      if (!estado) {
        return res.status(404).json({ error: 'Estado no encontrado' });
      }
      negocio.estado = estadoId;
    }

    if (municipioId) {
      const municipio = await Municipio.findById(municipioId);
      if (!municipio) {
        return res.status(404).json({ error: 'Municipio no encontrado' });
      }
      negocio.municipio = municipioId;
    }

    if (categoriaId) {
      const categoria = await Categoria.findById(categoriaId);
      if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
      negocio.categoria = categoriaId;
    }

    // Si hay nueva imagen, eliminar la anterior y actualizar
    if (req.file) {
      try {
        await cloudinary.uploader.destroy(negocio.imagen.public_id);
      } catch (error) {
        console.log('Error eliminando imagen anterior:', error);
      }

      negocio.imagen = {
        public_id: req.file.public_id,
        secure_url: req.file.secure_url
      };
    }

    await negocio.save();

    const negocioPopulado = await Negocio.findById(negocio._id)
      .populate('estado', 'nombre slug')
      .populate('municipio', 'nombre slug')
      .populate('categoria', 'nombre slug');

    res.json({
      success: true,
      message: 'Negocio actualizado correctamente',
      negocio: negocioPopulado
    });
  } catch (error) {
    console.error('Error actualizando negocio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar negocio (solo admin)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const negocio = await Negocio.findById(req.params.id);
    if (!negocio) {
      return res.status(404).json({ error: 'Negocio no encontrado' });
    }

    // Eliminar imagen de Cloudinary
    try {
      await cloudinary.uploader.destroy(negocio.imagen.public_id);
    } catch (error) {
      console.log('Error eliminando imagen:', error);
    }

    await Negocio.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Negocio eliminado correctamente'
    });
  } catch (error) {
    console.error('Error eliminando negocio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;