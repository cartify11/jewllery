import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../../data/products';

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-20 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="flex items-center justify-center gap-1.5 text-brand-gold text-[11px] uppercase tracking-[0.28em] font-medium mb-2">
          <InstagramIcon className="w-3.5 h-3.5" />
          <span>Follow The Maison</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-brand-black">
          @AureliaJewels on Instagram
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 font-normal">
          Daily glimpses from our Paris bench, private salon appointments, and red carpet moments.
        </p>
      </div>

      {/* 6-column / 3-column Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 px-2 sm:px-4 max-w-7xl mx-auto">
        {INSTAGRAM_POSTS.map((post) => (
          <div
            key={post.id}
            className="group relative aspect-square overflow-hidden bg-brand-black cursor-pointer shadow-sm"
          >
            <img
              src={post.image}
              alt="Aurelia Jewels Editorial Post"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
              <InstagramIcon className="w-6 h-6 text-brand-gold mb-2" />
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                <span>{post.likes}</span>
              </div>
              <p className="text-[10px] text-brand-ivory mt-2 line-clamp-2 font-normal">
                {post.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
