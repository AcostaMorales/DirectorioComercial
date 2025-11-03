import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services';
import { toast } from 'react-hot-toast';
import { FiUsers, FiMapPin, FiTag, FiShoppingBag, FiSettings } from 'react-icons/fi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const verificarAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await authService.verify();
      setAdminInfo(response.data.admin);
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    verificarAuth();
  }, [verificarAuth]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    toast.success('Sesión cerrada correctamente');
    navigate('/');
  };

  const adminMenuItems = [
    {
      icon: FiMapPin,
      title: 'Gestionar Estados',
      description: 'Agregar, editar y eliminar estados',
      color: '#e74c3c',
      action: () => toast.info('Funcionalidad en desarrollo')
    },
    {
      icon: FiUsers,
      title: 'Gestionar Municipios',
      description: 'Administrar municipios por estado',
      color: '#f39c12',
      action: () => toast.info('Funcionalidad en desarrollo')
    },
    {
      icon: FiTag,
      title: 'Gestionar Categorías',
      description: 'Crear y editar categorías de negocios',
      color: '#9b59b6',
      action: () => toast.info('Funcionalidad en desarrollo')
    },
    {
      icon: FiShoppingBag,
      title: 'Gestionar Negocios',
      description: 'Agregar y administrar negocios',
      color: '#2ecc71',
      action: () => toast.info('Funcionalidad en desarrollo')
    },
    {
      icon: FiSettings,
      title: 'Configuración',
      description: 'Cambiar contraseña y ajustes',
      color: '#34495e',
      action: () => toast.info('Funcionalidad en desarrollo')
    }
  ];

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '200px' 
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e1e5e9',
          borderTop: '4px solid #4a90e2',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: '#2c3e50', 
          marginBottom: '8px' 
        }}>
          Panel de Administración
        </h1>
        <p style={{ fontSize: '16px', color: '#6c757d', marginBottom: '16px' }}>
          Bienvenido, {adminInfo?.username}
        </p>
        <button
          onClick={handleLogout}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {adminMenuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            style={{
              background: 'white',
              border: `2px solid ${item.color}`,
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '12px' 
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px'
              }}>
                <item.icon size={24} color="white" />
              </div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#2c3e50', 
                margin: '0' 
              }}>
                {item.title}
              </h3>
            </div>
            <p style={{ 
              fontSize: '14px', 
              color: '#6c757d', 
              margin: '0',
              lineHeight: '1.4'
            }}>
              {item.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;