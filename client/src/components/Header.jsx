import React from 'react';
import { FiMenu, FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Botón de regreso (solo si no es la página principal) */}
        {!isHomePage && (
          <button 
            className="header-btn back-btn"
            onClick={handleBackClick}
            aria-label="Regresar"
          >
            <FiArrowLeft size={24} />
          </button>
        )}

        {/* Logo central */}
        <div className="logo-container">
          <img 
            src="/logo-vivey.png" 
            alt="Vivey Descubre México" 
            className="logo"
            onClick={() => navigate('/')}
          />
        </div>

        {/* Menú hamburguesa */}
        <button 
          className="header-btn menu-btn"
          onClick={onMenuToggle}
          aria-label="Menú"
        >
          <FiMenu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;