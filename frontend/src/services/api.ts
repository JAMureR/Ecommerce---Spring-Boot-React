import axios from 'axios';

// Cliente Axios principal
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// ===============================
// INTERCEPTOR DE PETICIONES
// ===============================
// Añade automáticamente el JWT a todas las peticiones.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// INTERCEPTOR DE RESPUESTAS
// ===============================
// Si el token expira o es inválido, cerramos sesión.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// ===============================
// DATOS MOCK TEMPORALES
// ===============================
// Puedes mantenerlos mientras terminas el backend de productos.
export const mockProducts = [
  {
    id: '1',
    name: 'Vestido de Seda Esmeralda',
    price: 299.99,
    category: 'Vestidos',
    image: 'https://images.unsplash.com/photo-1539008835279-434693881cc9?auto=format&fit=crop&q=80&w=800',
    description: 'Un vestido elegante confeccionado en seda pura con un corte sofisticado.',
    sizes: ['XS', 'S', 'M', 'L'],
    featured: true
  },
  {
    id: '2',
    name: 'Blazer de Lino Marfil',
    price: 189.50,
    category: 'Chaquetas',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    description: 'Blazer estructurado ideal para un look profesional y refinado.',
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true
  },
  {
    id: '3',
    name: 'Pantalones Palazzo de Satén',
    price: 145.0,
    category: 'Pantalones',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
    description: 'Pantalones fluidos de tiro alto con acabado satinado.',
    sizes: ['XS', 'S', 'M', 'L'],
    featured: false
  }
];

export default api;