import React from 'react';
import { FiHome, FiMapPin, FiBell } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const footerButtons = [
    {
      icon: FiHome,
      label: 'Inicio',
      path: '/',
      isActive: location.pathname === '/'
    },
    {
      icon: FiMapPin,
      label: 'Estados',
      path: '/region',
      isActive: location.pathname.startsWith('/region')
    },
    {
      icon: FiBell,
      label: 'Notificaciones',
      path: '/notificaciones',
      isActive: location.pathname === '/notificaciones'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {footerButtons.map((button, index) => (
          <button
            key={index}
            className={`footer-btn ${button.isActive ? 'active' : ''}`}
            onClick={() => handleNavigation(button.path)}
            aria-label={button.label}
          >
            <button.icon size={24} />
            <span className="footer-btn-label">{button.label}</span>
          </button>
        ))}
      </div>
    </footer>
  );
};

export default Footer;