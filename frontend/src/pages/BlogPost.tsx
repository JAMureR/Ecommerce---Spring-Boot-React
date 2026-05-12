import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
import { blogService } from '../services/blogService';
import { motion } from 'motion/react';
import { Loader2, ChevronLeft, Calendar, User, Tag } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const data = await blogService.getPostById(id);
      setPost(data || null);
      setIsLoading(false);
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="animate-spin text-stone-300" size={40} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-40 text-center">
        <h2 className="text-2xl font-serif text-stone-900 mb-4">Artículo no encontrado</h2>
        <button onClick={() => navigate('/blog')} className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-900 pb-1">Volver al blog</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate('/blog')}
        className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors mb-12"
      >
        <ChevronLeft size={12} />
        <span>Volver al Journal</span>
      </button>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <header className="text-center mb-12">
          <div className="flex items-center justify-center space-x-6 text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar size={12} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User size={12} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag size={12} />
              <span>{post.category}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight mb-8">{post.title}</h1>
        </header>

        <div className="aspect-[21/9] overflow-hidden bg-stone-100 mb-16">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="prose prose-stone max-w-none">
          <p className="text-xl font-serif italic text-stone-600 mb-12 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="text-stone-800 text-lg font-light leading-loose space-y-8">
            {post.content.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
            </p>
          </div>
        </div>

        <footer className="mt-20 pt-12 border-t border-stone-100 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-stone-200 rounded-full overflow-hidden">
               <img src="https://i.pravatar.cc/150?u=elena" alt="Author" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-900">{post.author}</p>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest">Editor Senior</p>
            </div>
          </div>
          <div className="flex space-x-4">
            {/* Social share icons placeholder */}
          </div>
        </footer>
      </motion.article>
    </div>
  );
};

export default BlogPostPage;
