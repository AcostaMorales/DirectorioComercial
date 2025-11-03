import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';
import './Layout.css';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="layout">
      <Header onMenuToggle={toggleMenu} />
      
      <main className="main-content">
        {children}
      </main>
      
      <Footer />
      
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={closeMenu} 
      />
    </div>
  );
};

export default Layout;