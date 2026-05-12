import { mockProducts } from './api';
import { Product } from '../types';

export const productService = {
  getProducts: async (category?: string, maxPrice?: number): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockProducts];
        if (category && category !== 'Todas') {
          filtered = filtered.filter(p => p.category === category);
        }
        if (maxPrice) {
          filtered = filtered.filter(p => p.price <= maxPrice);
        }
        resolve(filtered);
      }, 800);
    });
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts.find(p => p.id === id));
      }, 500);
    });
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts.filter(p => p.featured));
      }, 600);
    });
  }
};
