import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-xl font-serif tracking-widest text-stone-900 uppercase">Luxe Aura</span>
            <p className="mt-4 text-stone-500 text-sm leading-relaxed">
              Elevando la elegancia femenina a través de piezas atemporales y sofisticadas. Moda de lujo para la mujer moderna.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-6">Explorar</h4>
            <ul className="space-y-4">
              <li><Link to="/catalog" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Nueva Colección</Link></li>
              <li><Link to="/catalog" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Vestidos</Link></li>
              <li><Link to="/blog" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Journal</Link></li>
              <li><Link to="/catalog" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-6">Ayuda</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Envíos y Devoluciones</Link></li>
              <li><Link to="/" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Guía de Tallas</Link></li>
              <li><Link to="/" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Contacto</Link></li>
              <li><Link to="/" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-sm text-stone-500 mb-4">Suscríbete para recibir noticias sobre lanzamientos exclusivos.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-white border border-stone-200 px-4 py-2 text-sm w-full focus:outline-none focus:border-stone-900"
              />
              <button className="bg-stone-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">Unirse</button>
            </form>
            <div className="flex space-x-4 mt-8">
              <Instagram size={18} className="text-stone-400 hover:text-stone-900 cursor-pointer transition-colors" />
              <Facebook size={18} className="text-stone-400 hover:text-stone-900 cursor-pointer transition-colors" />
              <Twitter size={18} className="text-stone-400 hover:text-stone-900 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[10px] text-stone-400 uppercase tracking-widest">© 2026 Luxe Aura. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-[10px] text-stone-400 hover:text-stone-900 uppercase tracking-widest">Privacidad</Link>
            <Link to="/" className="text-[10px] text-stone-400 hover:text-stone-900 uppercase tracking-widest">Términos</Link>
            <Link to="/" className="text-[10px] text-stone-400 hover:text-stone-900 uppercase tracking-widest">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
