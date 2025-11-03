const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Device = require('../models/Device');

const router = express.Router();

// Registrar dispositivo para notificaciones
router.post('/register-device', async (req, res) => {
  try {
    let { deviceId, pushToken, platform = 'web' } = req.body;

    // Si no se proporciona deviceId, generar uno nuevo
    if (!deviceId) {
      deviceId = uuidv4();
    }

    let device = await Device.findOne({ deviceId });

    if (device) {
      // Actualizar dispositivo existente
      device.pushToken = pushToken;
      device.platform = platform;
      device.ultimaActividad = new Date();
      device.activo = true;
      await device.save();
    } else {
      // Crear nuevo dispositivo
      device = new Device({
        deviceId,
        pushToken,
        platform,
        activo: true
      });
      await device.save();
    }

    res.json({
      success: true,
      deviceId: device.deviceId,
      message: 'Dispositivo registrado correctamente'
    });
  } catch (error) {
    console.error('Error registrando dispositivo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar estado de actividad del dispositivo
router.put('/device-activity/:deviceId', async (req, res) => {
  try {
    const device = await Device.findOne({ deviceId: req.params.deviceId });
    
    if (!device) {
      return res.status(404).json({ error: 'Dispositivo no encontrado' });
    }

    device.ultimaActividad = new Date();
    await device.save();

    res.json({
      success: true,
      message: 'Actividad actualizada'
    });
  } catch (error) {
    console.error('Error actualizando actividad:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener dispositivos activos (solo para propósitos administrativos)
router.get('/active-devices', async (req, res) => {
  try {
    const activeDevices = await Device.countDocuments({ 
      activo: true,
      ultimaActividad: { 
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Últimos 30 días
      }
    });

    res.json({
      activeDevices,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error obteniendo dispositivos activos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;