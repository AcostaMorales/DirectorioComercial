import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { estadoService } from '../services';
import { toast } from 'react-hot-toast';
import './RegionPage.css';

const RegionPage = () => {
  const navigate = useNavigate();
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstados();
  }, []);

  const cargarEstados = async () => {
    try {
      setLoading(true);
      const response = await estadoService.getAll();
      setEstados(response.data);
    } catch (error) {
      console.error('Error cargando estados:', error);
      toast.error('Error cargando los estados');
    } finally {
      setLoading(false);
    }
  };

  const handleEstadoClick = (estado) => {
    navigate(`/region/${estado.slug}`);
  };

  if (loading) {
    return (
      <div className="region-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando estados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="region-page">
      <div className="page-header">
        <h1 className="page-title">Selecciona un Estado</h1>
        <p className="page-subtitle">Elige el estado donde quieres buscar negocios</p>
      </div>

      <div className="estados-grid">
        {estados.map((estado) => (
          <button
            key={estado._id}
            className="estado-card"
            onClick={() => handleEstadoClick(estado)}
          >
            <div className="estado-content">
              <h3 className="estado-name">{estado.nombre}</h3>
              <div className="estado-arrow">→</div>
            </div>
          </button>
        ))}
      </div>

      {estados.length === 0 && !loading && (
        <div className="empty-state">
          <p>No hay estados registrados aún.</p>
        </div>
      )}
    </div>
  );
};

export default RegionPage;