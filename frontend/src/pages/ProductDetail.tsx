import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { Loader2, ChevronRight, ShoppingBag, Heart, Share2 } from 'lucide-react';
import RecommendedProducts from '../components/ai/RecommendedProducts';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setIsLoading(true);
      const data = await productService.getProductById(id);
      if (data) {
        setProduct(data);
        setSelectedSize(data.sizes[0]);
      }
      setIsLoading(false);
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, selectedSize);
      setIsAdding(false);
    }, 600);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="animate-spin text-stone-300" size={40} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-40 text-center">
        <h2 className="text-2xl font-serif text-stone-900 mb-4">Producto no encontrado</h2>
        <button onClick={() => navigate('/catalog')} className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-900 pb-1">Volver al catálogo</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-12">
        <button onClick={() => navigate('/')} className="hover:text-stone-900 transition-colors">Inicio</button>
        <ChevronRight size={10} />
        <button onClick={() => navigate('/catalog')} className="hover:text-stone-900 transition-colors">Colección</button>
        <ChevronRight size={10} />
        <span className="text-stone-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="aspect-[3/4] bg-stone-100 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400 mb-4">{product.category}</p>
            <h1 className="text-4xl font-serif text-stone-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-light text-stone-900">${product.price.toFixed(2)}</p>
          </div>

          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-4">Descripción</h3>
            <p className="text-stone-500 text-sm leading-relaxed font-light">{product.description}</p>
          </div>

          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900">Seleccionar Talla</h3>
              <button className="text-[10px] font-bold uppercase tracking-widest text-stone-400 border-b border-stone-200 pb-0.5 hover:text-stone-900 hover:border-stone-900 transition-all">Guía de tallas</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center text-xs font-bold border transition-all ${selectedSize === size ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-900'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 bg-stone-900 text-white py-5 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-stone-800 transition-colors disabled:bg-stone-400"
            >
              {isAdding ? <Loader2 className="animate-spin" size={16} /> : <><ShoppingBag size={16} /><span>Añadir al carrito</span></>}
            </button>
            <button className="p-5 border border-stone-200 text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all"><Heart size={18} /></button>
          </div>
        </motion.div>
      </div>
      <RecommendedProducts />
    </div>
  );
};

export default ProductDetail;
