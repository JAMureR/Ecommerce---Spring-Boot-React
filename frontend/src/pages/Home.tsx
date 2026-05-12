import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import RecommendedProducts from '../components/ai/RecommendedProducts';
import SearchBarAI from '../components/ai/SearchBarAI';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Fashion" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-stone-900/20" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-xl"
          >
            <span className="text-white text-xs font-bold tracking-[0.4em] uppercase mb-6 block">Nueva Colección 2026</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
              La Esencia de la <br /> <span className="italic">Sofisticación</span>
            </h1>
            <p className="text-white/90 text-lg mb-10 font-light leading-relaxed">
              Descubre piezas diseñadas para perdurar, donde el lujo se encuentra con la comodidad en cada detalle.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/catalog" 
                className="bg-white text-stone-900 px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors text-center"
              >
                Comprar Ahora
              </Link>
              <Link 
                to="/catalog" 
                className="border border-white text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors text-center"
              >
                Ver Colección
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 py-16 px-8 text-center">
          <h2 className="text-2xl font-serif text-stone-900 mb-8">Encuentra tu próximo look con IA</h2>
          <SearchBarAI />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Vestidos', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800' },
            { name: 'Accesorios', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800' },
            { name: 'Sastrería', img: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=800' }
          ].map((cat, i) => (
            <Link key={i} to="/catalog" className="group relative h-96 overflow-hidden">
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-white text-2xl font-serif mb-4">{cat.name}</h3>
                <span className="text-white text-[10px] font-bold uppercase tracking-widest border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity">Explorar</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Recommendations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecommendedProducts />
      </section>

      {/* Brand Values */}
      <section className="bg-stone-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-6">Calidad Suprema</h4>
              <p className="text-stone-400 text-sm font-light leading-relaxed">Materiales seleccionados de las mejores casas textiles del mundo para garantizar durabilidad y confort.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-6">Diseño Atemporal</h4>
              <p className="text-stone-400 text-sm font-light leading-relaxed">Piezas que trascienden las tendencias pasajeras, enfocadas en la elegancia clásica y moderna.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-6">Sostenibilidad</h4>
              <p className="text-stone-400 text-sm font-light leading-relaxed">Comprometidos con procesos de fabricación éticos y responsables con el medio ambiente.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
