import axios from 'axios';

// Simulación de interceptor para JWT
const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mocks para simular la API
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
    price: 145.00,
    category: 'Pantalones',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
    description: 'Pantalones fluidos de tiro alto con acabado satinado.',
    sizes: ['XS', 'S', 'M', 'L'],
    featured: false
  },
  {
    id: '4',
    name: 'Top de Encaje Chantilly',
    price: 89.00,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&q=80&w=800',
    description: 'Top delicado con detalles de encaje francés.',
    sizes: ['S', 'M', 'L'],
    featured: true
  },
  {
    id: '5',
    name: 'Abrigo de Cashmere Camel',
    price: 550.00,
    category: 'Abrigos',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800',
    description: 'Abrigo de lujo atemporal fabricado con el mejor cashmere.',
    sizes: ['S', 'M', 'L'],
    featured: true
  },
  {
    id: '6',
    name: 'Falda Midi Plisada Oro',
    price: 120.00,
    category: 'Faldas',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
    description: 'Falda con movimiento y brillo sutil para ocasiones especiales.',
    sizes: ['XS', 'S', 'M'],
    featured: false
  }
];

export default api;
