import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { blogService } from '../services/blogService';
import { motion } from 'motion/react';
import { Loader2, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await blogService.getPosts();
      setPosts(data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif text-stone-900 mb-4">Journal</h1>
        <p className="text-stone-500 text-sm uppercase tracking-widest">Historias de estilo, lujo y sofisticación</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-stone-300" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="aspect-[16/9] overflow-hidden bg-stone-100 mb-6">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 bg-stone-300 rounded-full" />
                    <span>{post.date}</span>
                  </div>
                  <h2 className="text-xl font-serif text-stone-900 group-hover:text-stone-600 transition-colors">{post.title}</h2>
                  <p className="text-stone-500 text-sm font-light leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="pt-2 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-stone-900">
                    <span>Leer más</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
