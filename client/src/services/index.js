import api from './api';

export const estadoService = {
  // Obtener todos los estados
  getAll: () => api.get('/estados'),
  
  // Obtener estado por slug
  getBySlug: (slug) => api.get(`/estados/${slug}`),
  
  // Crear estado (admin)
  create: (data) => api.post('/estados', data),
  
  // Actualizar estado (admin)
  update: (id, data) => api.put(`/estados/${id}`, data),
  
  // Eliminar estado (admin)
  delete: (id) => api.delete(`/estados/${id}`)
};

export const municipioService = {
  // Obtener municipios por estado
  getByEstado: (estadoSlug) => api.get(`/municipios/estado/${estadoSlug}`),
  
  // Obtener municipio por slug
  getBySlug: (slug) => api.get(`/municipios/${slug}`),
  
  // Crear municipio (admin)
  create: (data) => api.post('/municipios', data),
  
  // Actualizar municipio (admin)
  update: (id, data) => api.put(`/municipios/${id}`, data),
  
  // Eliminar municipio (admin)
  delete: (id) => api.delete(`/municipios/${id}`)
};

export const categoriaService = {
  // Obtener todas las categorías
  getAll: () => api.get('/categorias'),
  
  // Obtener categoría por slug
  getBySlug: (slug) => api.get(`/categorias/${slug}`),
  
  // Crear categoría (admin)
  create: (data) => api.post('/categorias', data),
  
  // Actualizar categoría (admin)
  update: (id, data) => api.put(`/categorias/${id}`, data),
  
  // Eliminar categoría (admin)
  delete: (id) => api.delete(`/categorias/${id}`)
};

export const negocioService = {
  // Obtener negocios con filtros
  getAll: (params = {}) => api.get('/negocios', { params }),
  
  // Obtener negocios por ubicación
  getByUbicacion: (estadoSlug, municipioSlug, categoria = null) => {
    const url = `/negocios/ubicacion/${estadoSlug}/${municipioSlug}`;
    return api.get(url, { params: categoria ? { categoria } : {} });
  },
  
  // Obtener categorías disponibles por ubicación
  getCategoriasByUbicacion: (estadoSlug, municipioSlug) => 
    api.get(`/negocios/categorias-ubicacion/${estadoSlug}/${municipioSlug}`),
  
  // Crear negocio (admin)
  create: (formData) => api.post('/negocios', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Actualizar negocio (admin)
  update: (id, formData) => api.put(`/negocios/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Eliminar negocio (admin)
  delete: (id) => api.delete(`/negocios/${id}`)
};

export const authService = {
  // Login de administrador
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Verificar token
  verify: () => api.get('/auth/verify'),
  
  // Cambiar contraseña
  changePassword: (data) => api.put('/auth/change-password', data)
};

export const notificationService = {
  // Registrar dispositivo
  registerDevice: (data) => api.post('/notifications/register-device', data),
  
  // Actualizar actividad del dispositivo
  updateActivity: (deviceId) => api.put(`/notifications/device-activity/${deviceId}`),
  
  // Obtener dispositivos activos
  getActiveDevices: () => api.get('/notifications/active-devices')
};