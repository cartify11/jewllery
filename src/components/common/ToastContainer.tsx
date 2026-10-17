import React from 'react';
import { Sparkles, X, CheckCircle, Info } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-brand-black text-brand-ivory border border-brand-gold/40 shadow-2xl p-4 flex items-start justify-between gap-3 animate-slide-up transition-all"
        >
          <div className="flex items-start gap-3">
            {toast.type === 'gold' ? (
              <Sparkles className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            ) : toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-brand-beige shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-xs font-medium tracking-wide text-white leading-relaxed">
                {toast.message}
              </p>
            </div>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-brand-grey hover:text-white transition-colors p-0.5 shrink-0"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
