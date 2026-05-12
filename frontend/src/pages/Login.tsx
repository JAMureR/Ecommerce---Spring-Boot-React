import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-12 bg-white p-10 border border-stone-100 shadow-sm"
      >
        <div className="text-center">
          <h2 className="text-3xl font-serif text-stone-900 mb-2">Bienvenida de nuevo</h2>
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Ingresa a tu cuenta exclusiva</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 text-xs p-3 border border-red-100 text-center uppercase tracking-widest font-bold">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                placeholder="sofia@ejemplo.com"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-stone-900 border-stone-300 rounded focus:ring-stone-900" />
              <label className="ml-2 block text-[10px] font-bold uppercase tracking-widest text-stone-400">Recordarme</label>
            </div>
            <Link to="/" className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900">¿Olvidaste tu contraseña?</Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-stone-900 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center space-x-3 disabled:bg-stone-400"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : <><span>Iniciar Sesión</span><ArrowRight size={14} /></>}
          </button>
        </form>

        <div className="text-center pt-6 border-t border-stone-100">
          <p className="text-xs text-stone-500">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="font-bold text-stone-900 uppercase tracking-widest ml-2 hover:border-b border-stone-900">Regístrate</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
