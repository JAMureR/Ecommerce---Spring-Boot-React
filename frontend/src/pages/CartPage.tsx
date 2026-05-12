import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <ShoppingBag size={48} className="mx-auto text-stone-200 mb-6" />
        <h2 className="text-2xl font-serif text-stone-900 mb-4">Tu carrito está vacío</h2>
        <p className="text-stone-500 mb-8">Parece que aún no has añadido ninguna pieza a tu colección.</p>
        <Link to="/catalog" className="inline-block bg-stone-900 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">
          Explorar Colección
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif text-stone-900 mb-12 text-center">Tu Carrito</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={`${item.id}-${item.selectedSize}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center space-x-6 py-6 border-b border-stone-100"
              >
                <div className="w-24 h-32 bg-stone-100 flex-shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-serif text-stone-900 tracking-wide">{item.name}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-1">Talla: {item.selectedSize}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-stone-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center border border-stone-200">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="p-2 text-stone-500 hover:text-stone-900"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-4 text-xs font-bold text-stone-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="p-2 text-stone-500 hover:text-stone-900"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-stone-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-stone-50 p-8 sticky top-32">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-8">Resumen del Pedido</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span className="text-stone-900 font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Envío</span>
                <span className="text-stone-900 font-medium">{total > 300 ? 'Gratis' : '$15.00'}</span>
              </div>
              <div className="border-t border-stone-200 pt-4 flex justify-between">
                <span className="text-sm font-bold uppercase tracking-widest text-stone-900">Total</span>
                <span className="text-lg font-serif text-stone-900">${(total > 300 ? total : total + 15).toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-stone-900 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center space-x-3">
              <span>Finalizar Compra</span>
              <ArrowRight size={14} />
            </button>
            
            <p className="mt-6 text-[10px] text-stone-400 text-center uppercase tracking-widest leading-relaxed">
              Pagos seguros mediante encriptación SSL de 256 bits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
