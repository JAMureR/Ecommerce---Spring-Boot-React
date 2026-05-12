import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { aiService } from '../../services/aiService';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const SearchBarAI: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        setIsLoading(true);
        const results = await aiService.getSearchSuggestions(query);
        setSuggestions(results);
        setIsLoading(false);
        setIsOpen(true);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);
    // En una app real, navegaríamos a resultados
    navigate(`/catalog?search=${suggestion}`);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto" ref={containerRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-stone-400 group-focus-within:text-stone-900 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca tu estilo sofisticado..."
          className="block w-full pl-11 pr-12 py-3 border border-stone-200 bg-white text-sm placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:ring-0 transition-all font-serif italic"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          {isLoading ? (
            <Loader2 size={16} className="text-stone-400 animate-spin" />
          ) : (
            <Sparkles size={16} className="text-amber-400 opacity-50" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 mt-2 w-full bg-white border border-stone-100 shadow-xl overflow-hidden"
          >
            <div className="p-2 bg-stone-50 border-b border-stone-100 flex items-center space-x-2">
              <Sparkles size={12} className="text-amber-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Sugerencias de IA</span>
            </div>
            <ul className="py-1">
              {suggestions.map((s, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleSelect(s)}
                    className="w-full text-left px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-colors flex items-center space-x-3"
                  >
                    <span className="w-1 h-1 bg-stone-300 rounded-full" />
                    <span>{s}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBarAI;
