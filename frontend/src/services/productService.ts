import { Product } from '../types';
import api from './api';

export const productService = {
  // Obtener todos los productos
  getProducts: async (
    category?: string,
    maxPrice?: number
  ): Promise<Product[]> => {
    try {
      // Petición a la API real del backend
      const response = await api.get<Product[]>('/products');

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
      return [];
    }
  },

  // Obtener un producto por ID
  getProductById: async (
    id: string | number
  ): Promise<Product | undefined> => {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      return undefined;
    }
  },

};