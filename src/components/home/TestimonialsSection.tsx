import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/products';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  const next = () => setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));

  const item = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F0] border-b border-brand-beige">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Quote Icon */}
        <div className="w-12 h-12 mx-auto rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-6">
          <Quote className="w-5 h-5 fill-current" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
          Client Acclaim & Press
        </span>

        {/* Dynamic Quote */}
        <div className="min-h-[160px] flex flex-col justify-center my-6">
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-black font-normal leading-relaxed">
            "{item.quote}"
          </blockquote>
        </div>

        {/* Rating */}
        <div className="flex justify-center text-brand-gold gap-1 mb-3">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>

        {/* Author */}
        <h4 className="font-serif text-base font-medium text-brand-black tracking-wide">
          {item.author}
        </h4>
        <p className="text-xs text-brand-grey uppercase tracking-luxury mt-0.5">
          {item.role}
        </p>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="p-2.5 rounded-full border border-brand-beige hover:border-brand-gold bg-white text-brand-black hover:text-brand-gold transition-colors shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  currentIndex === idx ? 'w-6 bg-brand-gold' : 'w-2 bg-brand-beige'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2.5 rounded-full border border-brand-beige hover:border-brand-gold bg-white text-brand-black hover:text-brand-gold transition-colors shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
