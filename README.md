# Directorio Comercial - Vivey Descubre México

Un directorio comercial moderno y responsive diseñado específicamente para dispositivos móviles, que permite a los usuarios descubrir negocios organizados por estado, municipio y categoría.

## 🚀 Características Principales

- **Diseño Mobile-First**: Optimizado para dispositivos móviles con botones grandes y navegación intuitiva
- **Navegación Jerárquica**: Estados → Municipios → Categorías → Negocios
- **Búsqueda Avanzada**: Filtros alfabéticos y búsqueda por texto
- **Panel de Administración**: Gestión completa de contenido
- **Sistema de Notificaciones**: Registro de dispositivos para notificaciones push
- **Almacenamiento en la Nube**: Integración con Cloudinary para imágenes

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** con **Express.js**
- **MongoDB** con **Mongoose**
- **Cloudinary** para almacenamiento de imágenes
- **JWT** para autenticación
- **bcryptjs** para encriptación de contraseñas

### Frontend
- **React 19** con **Vite**
- **React Router DOM** para navegación
- **Axios** para peticiones HTTP
- **React Icons** para iconografía
- **React Hot Toast** para notificaciones

## 📱 Estructura de Rutas

### Rutas Públicas
- `/` - Página principal con categorías
- `/region` - Lista de estados
- `/region/:estado` - Municipios del estado
- `/region/:estado/:municipio` - Categorías por municipio
- `/region/:estado/:municipio/:categoria` - Negocios por ubicación y categoría
- `/:categoria` - Todos los negocios de una categoría
- `/notificaciones` - Configuración de notificaciones

### Rutas de Administración
- `/admin/login` - Login de administrador
- `/admin` - Panel de control administrativo

## 🗄️ Modelos de Base de Datos

### Estado
```javascript
{
  nombre: String,
  slug: String (auto-generado),
  timestamps: true
}
```

### Municipio
```javascript
{
  nombre: String,
  slug: String (auto-generado),
  estado: ObjectId (referencia a Estado),
  timestamps: true
}
```

### Categoria
```javascript
{
  nombre: String,
  slug: String (auto-generado),
  descripcion: String,
  icono: String,
  timestamps: true
}
```

### Negocio
```javascript
{
  nombre: String,
  slug: String (auto-generado),
  url: String (URL de la página del negocio),
  imagen: {
    public_id: String (Cloudinary),
    secure_url: String (Cloudinary)
  },
  estado: ObjectId (referencia a Estado),
  municipio: ObjectId (referencia a Municipio),
  categoria: ObjectId (referencia a Categoria),
  activo: Boolean,
  timestamps: true
}
```

## ⚙️ Instalación y Configuración

### Prerrequisitos
- Node.js 16+
- MongoDB
- Cuenta de Cloudinary

### Backend

1. **Navegar al directorio del servidor**
```bash
cd server
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:
```env
MONGODB_URI=mongodb://localhost:27017/directorio-comercial
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
CLIENT_URL=http://localhost:5173
PORT=5000
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=admin123
```

4. **Crear administrador por defecto**
```bash
node scripts/createAdmin.js
```

5. **Iniciar el servidor**
```bash
npm run dev
```

### Frontend

1. **Navegar al directorio del cliente**
```bash
cd client
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Iniciar la aplicación**
```bash
npm run dev
```

## 🎨 Características de Diseño

### Layout Mobile-First
- **Header fijo**: Logo central, botón de regreso y menú hamburguesa
- **Footer fijo**: Navegación rápida (Inicio, Estados, Notificaciones)
- **Contenido dinámico**: Área principal que cambia según la ruta

### Componentes Principales
- **Layout**: Contenedor principal con header y footer fijos
- **Header**: Navegación superior con logo y controles
- **Footer**: Navegación inferior con accesos rápidos
- **SideMenu**: Menú lateral deslizable para opciones adicionales

### Páginas Principales
- **HomePage**: Imagen hero, filtro alfabético, búsqueda y categorías
- **RegionPage**: Lista de estados disponibles
- **MunicipiosPage**: Municipios del estado seleccionado
- **CategoriasPorMunicipioPage**: Categorías disponibles en el municipio
- **NegociosPorUbicacionPage**: Negocios por ubicación específica
- **NegociosPorCategoriaPage**: Todos los negocios de una categoría

## 🔐 Sistema de Administración

### Autenticación
- Login seguro con JWT
- Verificación automática de tokens
- Logout seguro con limpieza de tokens

### Funcionalidades Admin
- Gestión de Estados (CRUD)
- Gestión de Municipios (CRUD)
- Gestión de Categorías (CRUD)
- Gestión de Negocios (CRUD con imágenes)
- Subida de imágenes a Cloudinary

## 📱 Sistema de Notificaciones

### Registro de Dispositivos
- Generación automática de Device ID
- Almacenamiento local del Device ID
- Registro en servidor para notificaciones
- Actualización periódica de actividad

### Funcionalidades
- Registro automático al cargar la aplicación
- Seguimiento de actividad del usuario
- Base para futuras notificaciones push

## 🔄 API Endpoints

### Autenticación
- `POST /api/auth/login` - Login de administrador
- `GET /api/auth/verify` - Verificar token
- `PUT /api/auth/change-password` - Cambiar contraseña

### Estados
- `GET /api/estados` - Obtener todos los estados
- `GET /api/estados/:slug` - Obtener estado por slug
- `POST /api/estados` - Crear estado (admin)
- `PUT /api/estados/:id` - Actualizar estado (admin)
- `DELETE /api/estados/:id` - Eliminar estado (admin)

### Municipios
- `GET /api/municipios/estado/:estadoSlug` - Municipios por estado
- `GET /api/municipios/:slug` - Obtener municipio por slug
- `POST /api/municipios` - Crear municipio (admin)
- `PUT /api/municipios/:id` - Actualizar municipio (admin)
- `DELETE /api/municipios/:id` - Eliminar municipio (admin)

### Categorías
- `GET /api/categorias` - Obtener todas las categorías
- `GET /api/categorias/:slug` - Obtener categoría por slug
- `POST /api/categorias` - Crear categoría (admin)
- `PUT /api/categorias/:id` - Actualizar categoría (admin)
- `DELETE /api/categorias/:id` - Eliminar categoría (admin)

### Negocios
- `GET /api/negocios` - Obtener negocios con filtros
- `GET /api/negocios/ubicacion/:estadoSlug/:municipioSlug` - Negocios por ubicación
- `GET /api/negocios/categorias-ubicacion/:estadoSlug/:municipioSlug` - Categorías por ubicación
- `POST /api/negocios` - Crear negocio (admin, con imagen)
- `PUT /api/negocios/:id` - Actualizar negocio (admin)
- `DELETE /api/negocios/:id` - Eliminar negocio (admin)

### Notificaciones
- `POST /api/notifications/register-device` - Registrar dispositivo
- `PUT /api/notifications/device-activity/:deviceId` - Actualizar actividad
- `GET /api/notifications/active-devices` - Dispositivos activos

## 🚀 Despliegue

### Variables de Entorno de Producción
```env
# Backend
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/directorio-comercial
JWT_SECRET=tu_jwt_secret_super_seguro_para_produccion
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
CLIENT_URL=https://tu-dominio.com
PORT=5000

# Frontend
VITE_API_URL=https://tu-api.com/api
```

### Pasos de Despliegue
1. Configurar base de datos MongoDB (MongoDB Atlas recomendado)
2. Configurar cuenta de Cloudinary
3. Desplegar backend (Heroku, Railway, DigitalOcean, etc.)
4. Desplegar frontend (Vercel, Netlify, etc.)
5. Configurar variables de entorno en ambos servicios
6. Ejecutar script de creación de admin en producción

## 📖 Uso

### Para Usuarios
1. Navega a la página principal
2. Explora categorías o busca negocios específicos
3. Usa el filtro alfabético para encontrar negocios por inicial
4. Navega por estado y municipio para filtrar geográficamente
5. Toca cualquier negocio para visitar su página oficial

### Para Administradores
1. Accede a `/admin/login`
2. Usa las credenciales por defecto (admin/admin123)
3. **IMPORTANTE**: Cambia la contraseña inmediatamente
4. Gestiona estados, municipios, categorías y negocios desde el panel

## 🔧 Desarrollo

### Estructura del Proyecto
```
├── server/
│   ├── models/          # Modelos de Mongoose
│   ├── routes/          # Rutas del API
│   ├── middleware/      # Middlewares personalizados
│   ├── config/          # Configuraciones (Cloudinary, etc.)
│   ├── scripts/         # Scripts de utilidad
│   └── index.js         # Punto de entrada del servidor
├── client/
│   ├── src/
│   │   ├── components/  # Componentes React reutilizables
│   │   ├── pages/       # Páginas de la aplicación
│   │   ├── services/    # Servicios para API calls
│   │   ├── context/     # Contextos de React
│   │   ├── hooks/       # Hooks personalizados
│   │   └── assets/      # Recursos estáticos
│   └── public/          # Archivos públicos
```

### Scripts Disponibles

#### Backend
```bash
npm start          # Iniciar en producción
npm run dev        # Iniciar en desarrollo con nodemon
```

#### Frontend
```bash
npm run dev        # Iniciar servidor de desarrollo
npm run build      # Construir para producción
npm run preview    # Previsualizar build de producción
npm run lint       # Ejecutar linter
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas, por favor:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

## 🙏 Agradecimientos

- React team por la excelente biblioteca
- MongoDB por la base de datos flexible
- Cloudinary por el almacenamiento de imágenes
- Toda la comunidad open source que hace posible este proyecto

---

**Vivey Descubre México** - Conectando negocios con sus clientes 🇲🇽