import React from 'react';
import { FiBell, FiBellOff } from 'react-icons/fi';
import { useDevice } from '../hooks/useDevice';

const NotificacionesPage = () => {
  const { deviceId, isRegistered } = useDevice();

  return (
    <div style={{ padding: '20px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#2c3e50', marginBottom: '8px' }}>
          Notificaciones
        </h1>
        <p style={{ fontSize: '16px', color: '#6c757d', margin: '0' }}>
          Configura tus preferencias de notificaciones
        </p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '24px', 
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            {isRegistered ? (
              <FiBell size={24} color="#4a90e2" />
            ) : (
              <FiBellOff size={24} color="#6c757d" />
            )}
            <h3 style={{ marginLeft: '12px', fontSize: '18px', fontWeight: '600', color: '#2c3e50', margin: '0 0 0 12px' }}>
              Estado de Notificaciones
            </h3>
          </div>
          
          <p style={{ color: '#6c757d', marginBottom: '16px' }}>
            {isRegistered 
              ? 'Tu dispositivo está registrado para recibir notificaciones.'
              : 'Tu dispositivo no está registrado para notificaciones.'
            }
          </p>
          
          {deviceId && (
            <div style={{ 
              background: '#f8f9fa', 
              padding: '12px', 
              borderRadius: '8px', 
              fontSize: '14px',
              color: '#6c757d'
            }}>
              <strong>ID del dispositivo:</strong><br />
              {deviceId}
            </div>
          )}
        </div>

        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '24px', 
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#2c3e50', marginBottom: '16px' }}>
            Información
          </h3>
          <p style={{ color: '#6c757d', lineHeight: '1.6', margin: '0' }}>
            Las notificaciones te mantendrán informado sobre nuevos negocios agregados al directorio, 
            ofertas especiales y actualizaciones importantes. Tu privacidad es importante para nosotros 
            y solo enviaremos notificaciones relevantes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificacionesPage;