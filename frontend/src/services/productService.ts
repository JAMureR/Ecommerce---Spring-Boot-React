import { Product } from '../types';
import api, { mockProducts } from './api';

export const productService = {
  // Obtener todos los productos
  getProducts: async (
    category?: string,
    maxPrice?: number
  ): Promise<Product[]> => {
    try {
      // API REAL
      const response = await api.get('/products');

      let filtered: Product[] = response.data;

      // Filtrar por categoría
      if (category && category !== 'Todas') {
        filtered = filtered.filter(
          (product) => product.category === category
        );
      }

      // Filtrar por precio máximo
      if (maxPrice) {
        filtered = filtered.filter(
          (product) => product.price <= maxPrice
        );
      }

      return filtered;
    } catch (error) {
      console.error('Error al obtener productos desde la API:', error);

      // Fallback temporal a datos mock
      let filtered: Product[] = [...mockProducts];

      if (category && category !== 'Todas') {
        filtered = filtered.filter(
          (product) => product.category === category
        );
      }

      if (maxPrice) {
        filtered = filtered.filter(
          (product) => product.price <= maxPrice
        );
      }

      return filtered;
    }
  },

  // Obtener un producto por ID
  getProductById: async (
    id: string
  ): Promise<Product | undefined> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);

      // Fallback temporal
      return mockProducts.find(
        (product) => product.id === id
      );
    }
  },

  // Obtener productos destacados
  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products');

      return response.data.filter(
        (product: Product) => product.featured
      );
    } catch (error) {
      console.error('Error al obtener productos destacados:', error);

      // Fallback temporal
      return mockProducts.filter(
        (product) => product.featured
      );
    }
  }
};