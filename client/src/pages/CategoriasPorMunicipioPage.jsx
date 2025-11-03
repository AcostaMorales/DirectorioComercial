import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { negocioService, municipioService } from '../services';
import { toast } from 'react-hot-toast';
import './PagesShared.css';

const CategoriasPorMunicipioPage = () => {
  const { estado, municipio } = useParams();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [municipioInfo, setMunicipioInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true);
      
      // Cargar información del municipio
      const municipioResponse = await municipioService.getBySlug(municipio);
      setMunicipioInfo(municipioResponse.data);

      // Cargar categorías disponibles en el municipio
      const categoriasResponse = await negocioService.getCategoriasByUbicacion(estado, municipio);
      setCategorias(categoriasResponse.data);
    } catch (error) {
      console.error('Error cargando datos:', error);
      toast.error('Error cargando la información');
      navigate(`/region/${estado}`);
    } finally {
      setLoading(false);
    }
  }, [estado, municipio, navigate]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleCategoriaClick = (categoria) => {
    navigate(`/region/${estado}/${municipio}/${categoria.slug}`);
  };

  if (loading) {
    return (
      <div className="categorias-municipio-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando categorías...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="categorias-municipio-page">
      <div className="page-header">
        <h1 className="page-title">
          {municipioInfo ? `Categorías en ${municipioInfo.nombre}` : 'Categorías'}
        </h1>
        <p className="page-subtitle">Selecciona una categoría de negocio</p>
      </div>

      <div className="categorias-grid">
        {categorias.map((categoria) => (
          <button
            key={categoria._id}
            className="categoria-card"
            onClick={() => handleCategoriaClick(categoria)}
          >
            <div className="categoria-content">
              <h3 className="categoria-name">{categoria.nombre}</h3>
              <div className="categoria-arrow">→</div>
            </div>
          </button>
        ))}
      </div>

      {categorias.length === 0 && !loading && (
        <div className="empty-state">
          <p>No hay negocios registrados en este municipio aún.</p>
        </div>
      )}
    </div>
  );
};

export default CategoriasPorMunicipioPage;