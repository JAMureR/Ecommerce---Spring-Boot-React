import React, { createContext, useContext, useEffect, useState } from 'react';
import { cartService } from '../services/cartService';
import { CartItem, Product } from '../types';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const auth = useAuth(); // 👈 seguro

  useEffect(() => {
    const load = async () => {
      const saved = await cartService.getCart();

      if (auth.isAuthenticated) {
        const synced = await cartService.syncCart(saved);
        setCart(synced);
      } else {
        setCart(saved);
      }
    };

    load();
  }, [auth.isAuthenticated]);

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(
        i => i.id === product.id && i.selectedSize === size
      );

      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.selectedSize === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  const removeFromCart = (id: string, size: string) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.selectedSize === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    setCart(prev =>
      prev.map(i =>
        i.id === id && i.selectedSize === size ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};