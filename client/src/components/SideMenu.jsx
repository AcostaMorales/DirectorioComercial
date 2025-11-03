import React, { useState } from 'react';
import { FiX, FiSettings, FiLogOut, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isAdmin] = useState(() => {
    return localStorage.getItem('admin_token') !== null;
  });

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/');
    onClose();
  };

  const menuItems = [
    {
      icon: FiUser,
      label: 'Perfil',
      action: () => handleNavigation('/perfil'),
      showForAdmin: false
    },
    {
      icon: FiSettings,
      label: 'Configuración',
      action: () => handleNavigation('/configuracion'),
      showForAdmin: false
    }
  ];

  const adminItems = [
    {
      icon: FiSettings,
      label: 'Panel Admin',
      action: () => handleNavigation('/admin'),
      showForAdmin: true
    },
    {
      icon: FiLogOut,
      label: 'Cerrar Sesión',
      action: handleLogout,
      showForAdmin: true
    }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="menu-overlay" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Menú lateral */}
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2 className="menu-title">Menú</h2>
          <button 
            className="close-btn"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="menu-content">
          {/* Información del usuario/dispositivo */}
          <div className="user-info">
            <div className="user-avatar">
              <FiUser size={32} />
            </div>
            <div className="user-details">
              <h3>{isAdmin ? 'Administrador' : 'Usuario'}</h3>
              <p>Vivey Descubre México</p>
            </div>
          </div>

          {/* Elementos del menú */}
          <nav className="menu-nav">
            {menuItems
              .filter(item => !item.showForAdmin || isAdmin)
              .map((item, index) => (
                <button
                  key={index}
                  className="menu-item"
                  onClick={item.action}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}

            {/* Elementos específicos de admin */}
            {isAdmin && (
              <>
                <div className="menu-divider" />
                {adminItems.map((item, index) => (
                  <button
                    key={`admin-${index}`}
                    className={`menu-item ${item.label === 'Cerrar Sesión' ? 'logout' : ''}`}
                    onClick={item.action}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideMenu;