import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-brand-ivory min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
            Confidentiality
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-brand-black mt-2">
            Privacy Policy & Data Discretion
          </h1>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto my-6" />
          <p className="text-xs sm:text-sm text-brand-grey max-w-lg mx-auto leading-relaxed">
            Effective Date: October 2026. AURELIA JEWELS MAISON S.A. operates under rigorous international data protection protocols.
          </p>
        </div>

        <div className="bg-white border border-brand-beige p-8 sm:p-12 space-y-8 text-xs text-brand-grey leading-relaxed shadow-sm">
          <div>
            <h2 className="font-serif text-lg font-medium text-brand-black mb-2">1. Commitment to Client Confidentiality</h2>
            <p>
              As a purveyor of high jewellery, we understand that our patrons value utmost privacy and discretion. We treat your personal details, acquisition records, and delivery locations with the highest institutional care. We never sell, monetize, or disclose client identity to outside third parties.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-medium text-brand-black mb-2">2. Information Collected for Transactions</h2>
            <p>
              We collect information strictly necessary to execute your commissions, provide insured armored courier transit, issue GIA gemological deeds, and comply with international anti-money laundering (AML) and know-your-customer (KYC) regulations for precious metals.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-medium text-brand-black mb-2">3. 256-Bit Financial Encryption</h2>
            <p>
              All digital payment data is processed using PCI-DSS Level 1 compliant tokenization. Card credentials and private banking details never reside on our internal servers.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-medium text-brand-black mb-2">4. Your Statutory Rights (GDPR & CCPA)</h2>
            <p>
              Under the European Union General Data Protection Regulation and California Consumer Privacy Act, clients have full rights to inspect, rectify, or demand permanent erasure of their records by contacting privacy@aureliajewels.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
