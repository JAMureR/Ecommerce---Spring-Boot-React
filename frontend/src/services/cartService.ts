import { CartItem } from '../types';

export const cartService = {
  getCart: async (): Promise<CartItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cart = localStorage.getItem('cart');
        resolve(cart ? JSON.parse(cart) : []);
      }, 500);
    });
  },

  saveCart: async (cart: CartItem[]): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        resolve();
      }, 300);
    });
  },

  syncCart: async (localCart: CartItem[]): Promise<CartItem[]> => {
    // Simula fusión con backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(localCart);
      }, 800);
    });
  }
};
