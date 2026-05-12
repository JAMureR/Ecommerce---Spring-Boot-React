import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { productService } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import { Filter, ChevronDown, Loader2, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('Todas');
  const [priceRange, setPriceRange] = useState(1000);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['Todas', 'Vestidos', 'Chaquetas', 'Pantalones', 'Tops', 'Abrigos', 'Faldas'];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const data = await productService.getProducts(category, priceRange);
      setProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, [category, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
        <div>
          <h1 className="text-4xl font-serif text-stone-900 mb-2">Colección</h1>
          <p className="text-stone-500 text-sm uppercase tracking-widest">{products.length} Piezas encontradas</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-stone-900 border border-stone-200 px-6 py-3 hover:bg-stone-50 transition-colors"
          >
            <SlidersHorizontal size={14} />
            <span>Filtros</span>
          </button>
          
          <div className="relative group hidden sm:block">
            <button className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-stone-900 border border-stone-200 px-6 py-3">
              <span>Ordenar por</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-stone-100 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-6">Categoría</h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 text-xs font-medium tracking-wide border transition-all ${category === cat ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-900'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900">Precio Máximo</h3>
                  <span className="text-sm font-serif text-stone-900">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
                <div className="flex justify-between mt-2 text-[10px] text-stone-400 uppercase tracking-widest">
                  <span>$50</span>
                  <span>$1000</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="animate-spin text-stone-300" size={40} />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Cargando colección...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div className="text-center py-32">
          <p className="text-stone-500 font-serif italic">No se encontraron piezas que coincidan con los filtros seleccionados.</p>
          <button 
            onClick={() => { setCategory('Todas'); setPriceRange(1000); }}
            className="mt-6 text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-900 pb-1"
          >
            Limpiar filtros
          </button>
        </div>
      )}
      
      {/* Pagination Placeholder */}
      {!isLoading && products.length > 0 && (
        <div className="mt-20 flex justify-center space-x-4">
          <button className="w-10 h-10 flex items-center justify-center border border-stone-900 bg-stone-900 text-white text-xs font-bold">1</button>
          <button className="w-10 h-10 flex items-center justify-center border border-stone-200 text-stone-500 text-xs font-bold hover:border-stone-900 transition-colors">2</button>
          <button className="w-10 h-10 flex items-center justify-center border border-stone-200 text-stone-500 text-xs font-bold hover:border-stone-900 transition-colors">3</button>
        </div>
      )}
    </div>
  );
};

export default Catalog;
