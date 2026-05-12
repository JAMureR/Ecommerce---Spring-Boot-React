import { BlogPost } from '../types';

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Tendencias de Primavera: El Renacimiento de la Seda',
    excerpt: 'Descubre por qué la seda natural vuelve a ser la protagonista indiscutible de esta temporada.',
    content: 'La seda ha sido durante siglos el símbolo máximo de la elegancia y el lujo. Esta primavera, vemos un renacimiento de este material noble en cortes fluidos y colores vibrantes...',
    author: 'Elena Martínez',
    date: '15 Mar 2026',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
    category: 'Tendencias'
  },
  {
    id: '2',
    title: 'Cómo Construir un Armario Cápsula de Lujo',
    excerpt: 'Menos es más. Te enseñamos a seleccionar las piezas clave que nunca pasarán de moda.',
    content: 'Un armario cápsula no se trata de tener poca ropa, sino de tener la ropa adecuada. Invertir en calidad sobre cantidad es el primer paso para un estilo sofisticado...',
    author: 'Sofía Valente',
    date: '10 Mar 2026',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800',
    category: 'Estilo'
  },
  {
    id: '3',
    title: 'Sostenibilidad en la Alta Costura',
    excerpt: 'El compromiso de Luxe Aura con el medio ambiente y la moda ética.',
    content: 'La moda sostenible ya no es una opción, es una necesidad. En Luxe Aura, trabajamos con proveedores que respetan los ciclos naturales y garantizan condiciones dignas...',
    author: 'Marco Rossi',
    date: '05 Mar 2026',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
    category: 'Sostenibilidad'
  }
];

export const blogService = {
  getPosts: async (): Promise<BlogPost[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPosts), 600);
    });
  },
  getPostById: async (id: string): Promise<BlogPost | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPosts.find(p => p.id === id)), 400);
    });
  }
};
