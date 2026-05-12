import { LogOut, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const cartCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-stone-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-serif tracking-widest text-stone-900 uppercase">Luxe Aura</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" className={({ isActive }) => `text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}>INICIO</NavLink>
            <NavLink to="/catalog" className={({ isActive }) => `text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}>COLECCIÓN</NavLink>
            <NavLink to="/blog" className={({ isActive }) => `text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}>JOURNAL</NavLink>
            <NavLink to="/about" className="text-sm font-medium tracking-wide text-stone-500 hover:text-stone-900 transition-colors">NOSOTROS</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-5">
            <Link to="/catalog" className="p-2 text-stone-600 hover:text-stone-900 transition-colors">
              <Search size={20} />
            </Link>
            
            <div className="relative">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="hidden sm:inline text-xs font-medium text-stone-500 uppercase tracking-tighter">Hola, {user?.username.split(' ')[0] ?? 'Usuario'}</span>
                  <button onClick={logout} className="p-2 text-stone-600 hover:text-stone-900 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="p-2 text-stone-600 hover:text-stone-900 transition-colors">
                  <User size={20} />
                </Link>
              )}
            </div>

            <Link to="/cart" className="p-2 text-stone-600 hover:text-stone-900 transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-stone-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-lg font-serif text-stone-800">Inicio</Link>
              <Link to="/catalog" onClick={() => setIsMenuOpen(false)} className="block text-lg font-serif text-stone-800">Colección</Link>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block text-lg font-serif text-stone-800">Carrito ({cartCount})</Link>
              {!isAuthenticated && (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-lg font-serif text-stone-800">Iniciar Sesión</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
