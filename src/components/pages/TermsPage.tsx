import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-brand-ivory min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
            Legal & Warranty
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-brand-black mt-2">
            Terms of Service & Warranty
          </h1>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto my-6" />
          <p className="text-xs sm:text-sm text-brand-grey max-w-lg mx-auto leading-relaxed">
            Terms governing fine jewellery acquisitions, authenticity deeds, and international warranty.
          </p>
        </div>

        <div className="bg-white border border-brand-beige p-8 sm:p-12 space-y-8 text-xs text-brand-grey leading-relaxed shadow-sm">
          <div>
            <h2 className="font-serif text-lg font-medium text-brand-black mb-2">1. Scope of Agreement</h2>
            <p>
              These Terms of Service govern all acquisitions made through AURELIA JEWELS online boutique, our private salons in Paris, London, and New York, or through authorized concierge communications.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-medium text-brand-black mb-2">2. Authenticity & Gemological Deeds</h2>
            <p>
              Every piece sold by Aurelia is guaranteed authentic in perpetuity. Creations set with diamonds of 0.50 carats or greater and significant colored gemstones are accompanied by independent laboratory certificates (GIA, IGI, SSEF, or Gübelin). Assay hallmarks indicate genuine precious metal purity (750 for 18K solid gold, PT950 for platinum).
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-medium text-brand-black mb-2">3. Lifetime Craftsmanship Warranty</h2>
            <p>
              Aurelia warrants all creations against defects in materials and craftsmanship for the lifetime of the original client. This includes complimentary prong retipping, stone tightening, and annual ultrasonic cleaning. The warranty does not cover normal wear and tear, trauma damage, or unauthorized modifications made by third-party jewellers.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-medium text-brand-black mb-2">4. Bespoke & Engraved Commissions</h2>
            <p>
              Made-to-order bespoke commissions and personalized laser-engraved creations are final sale and non-returnable once production commences, except in the unlikely event of verified manufacturing deviation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
