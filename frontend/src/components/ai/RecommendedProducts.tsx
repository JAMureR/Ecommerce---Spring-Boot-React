import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { productService } from '../../services/productService';
import { aiService } from '../../services/aiService';
import ProductCard from '../products/ProductCard';
import { Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

const RecommendedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const recommendedIds = await aiService.getRecommendations();
        const allProducts = await productService.getProducts();
        const filtered = allProducts.filter(p => recommendedIds.includes(p.id));
        setProducts(filtered.length > 0 ? filtered : allProducts.slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-stone-300" size={32} />
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="flex items-center justify-center space-x-3 mb-12">
        <div className="h-[1px] w-12 bg-stone-200" />
        <div className="flex items-center space-x-2">
          <Sparkles size={16} className="text-amber-500" />
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-stone-900">Selección para ti</h2>
        </div>
        <div className="h-[1px] w-12 bg-stone-200" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
