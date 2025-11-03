import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import { DeviceProvider } from './context/DeviceContext.jsx';

// Páginas principales
import HomePage from './pages/HomePage';
import RegionPage from './pages/RegionPage';
import MunicipiosPage from './pages/MunicipiosPage';
import CategoriasPorMunicipioPage from './pages/CategoriasPorMunicipioPage';
import NegociosPorCategoriaPage from './pages/NegociosPorCategoriaPage';
import NegociosPorUbicacionPage from './pages/NegociosPorUbicacionPage';
import NotificacionesPage from './pages/NotificacionesPage';
import PabellonArteagaPage from './pages/PabellonArteagaPage';

// Páginas de administración
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';

import './App.css';

function App() {
  return (
    <DeviceProvider>
      <Router>
        <div className="App">
          <Layout>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/region" element={<RegionPage />} />
              <Route path="/region/:estado" element={<MunicipiosPage />} />
              <Route path="/region/:estado/:municipio" element={<CategoriasPorMunicipioPage />} />
              <Route path="/region/:estado/:municipio/:categoria" element={<NegociosPorUbicacionPage />} />
              <Route path="/:categoria" element={<NegociosPorCategoriaPage />} />
              <Route path="/notificaciones" element={<NotificacionesPage />} />
              
              {/* Página de ejemplo - Pabellón de Arteaga */}
              <Route path="/region/aguascalientes/pabellondearteaga" element={<PabellonArteagaPage />} />
              
              {/* Rutas de administración */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Layout>
          
          {/* Toast notifications */}
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </DeviceProvider>
  );
}

export default App;
