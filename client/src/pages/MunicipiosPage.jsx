import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { municipioService, estadoService } from '../services';
import { toast } from 'react-hot-toast';
import './MunicipiosPage.css';

const MunicipiosPage = () => {
  const { estado } = useParams();
  const navigate = useNavigate();
  const [municipios, setMunicipios] = useState([]);
  const [estadoInfo, setEstadoInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true);
      
      // Cargar información del estado
      const estadoResponse = await estadoService.getBySlug(estado);
      setEstadoInfo(estadoResponse.data);

      // Cargar municipios del estado
      const municipiosResponse = await municipioService.getByEstado(estado);
      setMunicipios(municipiosResponse.data);
    } catch (error) {
      console.error('Error cargando datos:', error);
      toast.error('Error cargando la información');
      navigate('/region');
    } finally {
      setLoading(false);
    }
  }, [estado, navigate]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleMunicipioClick = (municipio) => {
    navigate(`/region/${estado}/${municipio.slug}`);
  };

  if (loading) {
    return (
      <div className="municipios-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando municipios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="municipios-page">
      <div className="page-header">
        <h1 className="page-title">
          {estadoInfo ? `Municipios de ${estadoInfo.nombre}` : 'Municipios'}
        </h1>
        <p className="page-subtitle">Selecciona el municipio donde quieres buscar</p>
      </div>

      <div className="municipios-grid">
        {municipios.map((municipio) => (
          <button
            key={municipio._id}
            className="municipio-card"
            onClick={() => handleMunicipioClick(municipio)}
          >
            <div className="municipio-content">
              <h3 className="municipio-name">{municipio.nombre}</h3>
              <div className="municipio-arrow">→</div>
            </div>
          </button>
        ))}
      </div>

      {municipios.length === 0 && !loading && (
        <div className="empty-state">
          <p>No hay municipios registrados para este estado aún.</p>
        </div>
      )}
    </div>
  );
};

export default MunicipiosPage;