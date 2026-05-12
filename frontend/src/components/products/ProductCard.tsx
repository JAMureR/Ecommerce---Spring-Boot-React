import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`}>
        <div className="aspect-[3/4] w-full overflow-hidden bg-stone-100 relative">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          
          {/* Quick Add Overlay (Optional) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm">
            <p className="text-[10px] font-bold tracking-widest text-center text-stone-900 uppercase">Ver detalles</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center text-center">
          <h3 className="text-sm font-serif text-stone-800 tracking-wide">{product.name}</h3>
          <p className="mt-1 text-xs font-medium text-stone-500 uppercase tracking-widest">{product.category}</p>
          <p className="mt-2 text-sm font-semibold text-stone-900">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
