import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { categoriaService, negocioService } from '../services';
import { toast } from 'react-hot-toast';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [letraSeleccionada, setLetraSeleccionada] = useState('');
  const [loading, setLoading] = useState(true);

  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      setLoading(true);
      const response = await categoriaService.getAll();
      setCategorias(response.data);
    } catch (error) {
      console.error('Error cargando categorías:', error);
      toast.error('Error cargando las categorías');
    } finally {
      setLoading(false);
    }
  };

  const handleBusqueda = async (e) => {
    e.preventDefault();
    if (!busqueda.trim()) return;

    try {
      // Buscar negocios por nombre
      const response = await negocioService.getAll({ busqueda: busqueda.trim() });
      
      if (response.data.negocios.length > 0) {
        // Si hay resultados, navegar a una página de resultados
        navigate(`/busqueda?q=${encodeURIComponent(busqueda.trim())}`);
      } else {
        toast.error('No se encontraron resultados');
      }
    } catch (error) {
      console.error('Error en búsqueda:', error);
      toast.error('Error en la búsqueda');
    }
  };

  const handleLetraClick = (letra) => {
    setLetraSeleccionada(letra === letraSeleccionada ? '' : letra);
    // Aquí podrías implementar la lógica para filtrar negocios por letra inicial
    navigate(`/busqueda?letra=${letra}`);
  };

  const handleCategoriaClick = (categoria) => {
    navigate(`/${categoria.slug}`);
  };

  if (loading) {
    return (
      <div className="homepage">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando categorías...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Imagen de encabezado del cuerpo */}
      <div className="hero-section">
        <img 
          src="/hero-image.jpg" 
          alt="Descubre México" 
          className="hero-image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="hero-overlay">
          <h1 className="hero-title">Descubre México</h1>
          <p className="hero-subtitle">Encuentra los mejores negocios cerca de ti</p>
        </div>
      </div>

      {/* Filtro de letras */}
      <div className="filter-section">
        <h2 className="section-title">Buscar por inicial</h2>
        <div className="letters-grid">
          {letras.map((letra) => (
            <button
              key={letra}
              className={`letter-btn ${letraSeleccionada === letra ? 'active' : ''}`}
              onClick={() => handleLetraClick(letra)}
            >
              {letra}
            </button>
          ))}
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-section">
        <form onSubmit={handleBusqueda} className="search-form">
          <div className="search-input-container">
            <FiSearch className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar negocios o categorías..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="search-input"
            />
          </div>
          <button type="submit" className="search-btn">
            Buscar
          </button>
        </form>
      </div>

      {/* Categorías de negocios */}
      <div className="categories-section">
        <h2 className="section-title">Categorías</h2>
        <div className="categories-grid">
          {categorias.map((categoria) => (
            <button
              key={categoria._id}
              className="category-card"
              onClick={() => handleCategoriaClick(categoria)}
            >
              <div className="category-icon">
                {categoria.icono ? (
                  <img src={categoria.icono} alt={categoria.nombre} />
                ) : (
                  <div className="category-icon-placeholder">
                    {categoria.nombre.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h3 className="category-name">{categoria.nombre}</h3>
              {categoria.descripcion && (
                <p className="category-description">{categoria.descripcion}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;