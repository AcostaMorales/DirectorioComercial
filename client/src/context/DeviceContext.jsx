import React, { useEffect, useState, useCallback } from 'react';
import { notificationService } from '../services';
import { DeviceContext } from './deviceContext';

export const DeviceProvider = ({ children }) => {
  const [deviceId, setDeviceId] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const generateDeviceId = () => {
    return 'device-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  };

  const startActivityUpdates = useCallback((deviceId) => {
    // Actualizar actividad cada 5 minutos
    const interval = setInterval(async () => {
      try {
        await notificationService.updateActivity(deviceId);
      } catch (error) {
        console.error('Error actualizando actividad:', error);
      }
    }, 5 * 60 * 1000);

    // Limpiar interval cuando se cierre la ventana
    window.addEventListener('beforeunload', () => {
      clearInterval(interval);
    });

    return interval;
  }, []);

  const initializeDevice = useCallback(async () => {
    try {
      let storedDeviceId = localStorage.getItem('device_id');
      
      if (!storedDeviceId) {
        storedDeviceId = generateDeviceId();
        localStorage.setItem('device_id', storedDeviceId);
      }

      setDeviceId(storedDeviceId);

      // Registrar dispositivo en el servidor
      const response = await notificationService.registerDevice({
        deviceId: storedDeviceId,
        platform: 'web'
      });

      if (response.data.success) {
        setIsRegistered(true);
        // Actualizar actividad periódicamente
        startActivityUpdates(storedDeviceId);
      }
    } catch (error) {
      console.error('Error inicializando dispositivo:', error);
    }
  }, [startActivityUpdates]);

  useEffect(() => {
    initializeDevice();
  }, [initializeDevice]);

  const value = {
    deviceId,
    isRegistered,
    initializeDevice
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};