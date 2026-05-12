import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
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
          <h2 className="text-3xl font-serif text-stone-900 mb-2">Crea tu cuenta</h2>
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Únete a la experiencia Luxe Aura</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 text-xs p-3 border border-red-100 text-center uppercase tracking-widest font-bold">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Nombre Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                placeholder="Sofía Valente"
              />
            </div>
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
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                placeholder="Repite tu contraseña"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-stone-900 text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center space-x-3 disabled:bg-stone-400"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : <><span>Registrarse</span><ArrowRight size={14} /></>}
          </button>
        </form>

        <div className="text-center pt-6 border-t border-stone-100">
          <p className="text-xs text-stone-500">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-bold text-stone-900 uppercase tracking-widest ml-2 hover:border-b border-stone-900">Inicia Sesión</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
