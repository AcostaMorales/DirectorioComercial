import React from 'react';
import './PabellonArteagaPage.css';

const PabellonArteagaPage = () => {

  // Categorías de ejemplo para Pabellón de Arteaga
  const categorias = [
    {
      id: 1,
      nombre: 'Abarrotes',
      descripcion: 'Tiendas de abarrotes y conveniencia',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762155659/Abarrotes_v7ajbv.png',
      imagenFallback: '',
      color: '#e74c3c'
    },
    {
      id: 2,
      nombre: 'Bares',
      descripcion: 'Bares y cantinas locales',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762155627/BARES_inxof7.png',
      imagenFallback: '',
      color: '#f39c12'
    },
    {
      id: 3,
      nombre: 'Burritos',
      descripcion: 'Restaurantes de burritos',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762155648/BURRITOS_cgf6zb.png',
      imagenFallback: '',
      color: '#2ecc71'
    },
    {
      id: 4,
      nombre: 'Clínicas',
      descripcion: 'Servicios médicos y clínicas',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762159067/CLINICAS_g9hxgb.png',
      imagenFallback: '',
      color: '#2ecc71'
    },
    {
      id: 5,
      nombre: 'Equipo Agrícola',
      descripcion: 'Equipo y suministros agrícolas',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762155670/EQUIPO_AGRICOLA_edxrjl.png',
      imagenFallback: '',
      color: '#9b59b6'
    },
    {
      id: 6,
      nombre: 'Ferreterías',
      descripcion: 'Herramientas y materiales de construcción',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762159178/FERRETERIAS_nv3ndi.png',
      imagenFallback: '',
      color: '#34495e'
    },
    {
      id: 7,
      nombre: 'Forrajerias',
      descripcion: 'Forrajes y alimentos para animales',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762159597/FORRAJERIA_azob0e.png',
      imagenFallback: '',
      color: '#1abc9c'
    },
    {
      id: 8,
      nombre: 'Gorditas',
      descripcion: 'Gorditas de guisos variados',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762159143/GORDITAS_vzlm0v.png',
      imagenFallback: '',
      color: '#1abc9c'
    },
    {
      id: 9,
      nombre: 'Importadoras',
      descripcion: 'Importadoras de productos variados',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762159289/IMPORTADORAS_zpvw6z.png',
      imagenFallback: '',
      color: '#1abc9c'
    },
    {
      id: 10,
      nombre: 'Mueblerias',
      descripcion: 'Venta de muebles y decoración',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762159775/MUEBLERIAS_fpzyd5.png',
      imagenFallback: '',
      color: '#1abc9c'
    },
    {
      id: 11,
      nombre: 'Obradores',
      descripcion: 'Venta de carnicería y productos cárnicos',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762159814/OBRADORES_blml8s.png',
      imagenFallback: '',
      color: '#1abc9c'
    },
    {
      id: 12,
      nombre: 'Pinturas',
      descripcion: 'Venta de pinturas y recubrimientos',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762159214/PINTURAS_kbbd3p.png',
      imagenFallback: '',
      color: '#1abc9c'
    },
    {
      id: 13,
      nombre: 'Pollerias',
      descripcion: 'Pollerías y venta de pollo fresco',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762159132/POLLERIAS_lm0jez.png',
      imagenFallback: '',
      color: '#1abc9c'
    },
    {
      id: 14,
      nombre: 'Rosticerias',
      descripcion: 'Rosticerías y comida preparada',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762159962/ROSTICERIAS_baauql.png',
      imagenFallback: '',
      color: '#1abc9c'
    },
    {
      id: 15,
      nombre: 'SPA',
      descripcion: 'Centros de relajación y belleza',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762155680/SPAS_ktdstn.png',
      imagenFallback: '',
      color: '#1abc9c'
    },
    {
      id: 17,
      nombre: 'Vinicolas',
      descripcion: 'Vinícolas y bodegas de vino',
      imagen: 'https://res.cloudinary.com/dbebikryr/image/upload/v1762155638/VINICOLAS_sbxae6.png',
      imagenFallback: '',
      color: '#1abc9c'
    },
    
    
   
  ];

  const handleCategoriaClick = (categoria) => {
    // Por ahora solo mostramos un mensaje, más adelante se puede implementar la navegación real
    alert(`Próximamente: Negocios de ${categoria.nombre} en Pabellón de Arteaga`);
  };

  const handleImageError = (e, imagenFallback) => {
    // Si la imagen no carga, mostrar el emoji de respaldo
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'flex';
    e.target.nextElementSibling.textContent = imagenFallback;
  };

  return (
    <div className="pabellon-page">
      {/* Imagen de encabezado */}
      <div className="hero-section">
        <img 
          src="https://res.cloudinary.com/dbebikryr/image/upload/v1762155552/Encabezado_uzy7te.png" 
          alt="Pabellón de Arteaga, Aguascalientes" 
          className="hero-image"
          onError={(e) => {
            // Si no encuentra la imagen, usar un gradiente de fondo
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          }}
        />
      </div>

      {/* Información del municipio */}
      <div className="info-section">
        <div className="info-card">
          <h1>Pabellón de Arteaga</h1>
          <p className="location-subtitle">Aguascalientes, México</p>
          <p>
            Municipio ubicado en el estado de Aguascalientes, conocido por su rica historia,
            tradiciones y la calidez de su gente. Aquí encontrarás una variedad de negocios
            locales que ofrecen productos y servicios de calidad.
          </p>
        </div>
      </div>

      {/* Categorías de negocios */}
      <div className="categories-section">
        <h2 className="section-title">Categorías de Negocios</h2>
        
        <div className="categories-grid">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              className="category-card"
              onClick={() => handleCategoriaClick(categoria)}
              style={{ borderColor: categoria.color }}
            >
              <div className="category-icon-container">
                <img
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  className="category-image"
                  onError={(e) => handleImageError(e, categoria.imagenFallback)}
                />
                <div 
                  className="category-icon category-fallback" 
                  style={{ 
                    backgroundColor: categoria.color,
                    display: 'none'
                  }}
                >
                  {categoria.imagenFallback}
                </div>
              </div>
              <div className="category-content">
                
               
              </div>
             
            </button>
          ))}
        </div>
      </div>

      {/* Nota temporal */}
      <div className="temp-notice">
        <div className="notice-card">
          <h3>🚧 Página de Ejemplo</h3>
          <p>
            Esta es una página temporal de demostración para mostrar cómo se verá
            el directorio comercial de Pabellón de Arteaga. Pronto se integrarán
            los negocios reales de la comunidad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PabellonArteagaPage;