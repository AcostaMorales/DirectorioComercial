import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { negocioService, categoriaService } from '../services';
import { toast } from 'react-hot-toast';
import { FiExternalLink } from 'react-icons/fi';
import './PagesShared.css';

const NegociosPorCategoriaPage = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const [negocios, setNegocios] = useState([]);
  const [categoriaInfo, setCategoriaInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true);
      
      // Cargar información de la categoría
      const categoriaResponse = await categoriaService.getBySlug(categoria);
      setCategoriaInfo(categoriaResponse.data);

      // Cargar todos los negocios de esta categoría
      const negociosResponse = await negocioService.getAll({ categoria });
      setNegocios(negociosResponse.data.negocios);
    } catch (error) {
      console.error('Error cargando datos:', error);
      toast.error('Error cargando la información');
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [categoria, navigate]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleNegocioClick = (negocio) => {
    window.open(negocio.url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="negocios-categoria-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando negocios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="negocios-categoria-page">
      <div className="page-header">
        <h1 className="page-title">
          {categoriaInfo ? categoriaInfo.nombre : 'Negocios'}
        </h1>
        <p className="page-subtitle">
          {categoriaInfo?.descripcion || 'Todos los negocios de esta categoría'}
        </p>
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
              <p className="negocio-location">
                {negocio.municipio?.nombre}, {negocio.estado?.nombre}
              </p>
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

export default NegociosPorCategoriaPage;