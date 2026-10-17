import React from 'react';
import { HeroSection } from './HeroSection';
import { FeaturedCategories } from './FeaturedCategories';
import { BestSellersSection } from './BestSellersSection';
import { BrandStorySection } from './BrandStorySection';
import { NewArrivalsSection } from './NewArrivalsSection';
import { PromotionalBanner } from './PromotionalBanner';
import { EditorialLookbook } from './EditorialLookbook';
import { TestimonialsSection } from './TestimonialsSection';
import { FaqSection } from './FaqSection';
import { InstagramGallery } from './InstagramGallery';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <FeaturedCategories />
      <BestSellersSection />
      <BrandStorySection />
      <NewArrivalsSection />
      <PromotionalBanner />
      <EditorialLookbook />
      <TestimonialsSection />
      <FaqSection />
      <InstagramGallery />
    </div>
  );
};
