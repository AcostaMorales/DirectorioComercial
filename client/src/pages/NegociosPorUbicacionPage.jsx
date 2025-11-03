import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { negocioService } from '../services';
import { toast } from 'react-hot-toast';
import { FiExternalLink } from 'react-icons/fi';
import './PagesShared.css';

const NegociosPorUbicacionPage = () => {
  const { estado, municipio, categoria } = useParams();
  const navigate = useNavigate();
  const [negocios, setNegocios] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarNegocios = useCallback(async () => {
    try {
      setLoading(true);
      const response = await negocioService.getByUbicacion(estado, municipio, categoria);
      setNegocios(response.data);
    } catch (error) {
      console.error('Error cargando negocios:', error);
      toast.error('Error cargando los negocios');
      navigate(`/region/${estado}/${municipio}`);
    } finally {
      setLoading(false);
    }
  }, [estado, municipio, categoria, navigate]);

  useEffect(() => {
    cargarNegocios();
  }, [cargarNegocios]);

  const handleNegocioClick = (negocio) => {
    window.open(negocio.url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="negocios-ubicacion-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando negocios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="negocios-ubicacion-page">
      <div className="page-header">
        <h1 className="page-title">Negocios encontrados</h1>
        <p className="page-subtitle">Toca cualquier negocio para visitar su página</p>
      </div>

      <div className="negocios-grid">
        {negocios.map((negocio) => (
          <button
            key={negocio._id}
            className="negocio-card"
            onClick={() => handleNegocioClick(negocio)}
          >
            <div className="negocio-image-container">
              <img 
                src={negocio.imagen.secure_url} 
                alt={negocio.nombre}
                className="negocio-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="negocio-content">
              <h3 className="negocio-name">{negocio.nombre}</h3>
              <div className="negocio-link-icon">
                <FiExternalLink size={20} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {negocios.length === 0 && !loading && (
        <div className="empty-state">
          <p>No hay negocios registrados en esta categoría aún.</p>
        </div>
      )}
    </div>
  );
};

export default NegociosPorUbicacionPage;