import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderSuccessPage } from './components/checkout/OrderSuccessPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { FaqPage } from './components/pages/FaqPage';
import { ShippingPage } from './components/pages/ShippingPage';
import { ReturnsPage } from './components/pages/ReturnsPage';
import { CarePage } from './components/pages/CarePage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TermsPage } from './components/pages/TermsPage';
import { TrackOrderPage } from './components/pages/TrackOrderPage';
import { AccountPage } from './components/pages/AccountPage';
import { WishlistPage } from './components/pages/WishlistPage';

const AppContent: React.FC = () => {
  const { activePage } = useShop();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-success':
        return <OrderSuccessPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FaqPage />;
      case 'shipping':
        return <ShippingPage />;
      case 'returns':
        return <ReturnsPage />;
      case 'care':
        return <CarePage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'track':
        return <TrackOrderPage />;
      case 'account':
        return <AccountPage />;
      case 'wishlist':
        return <WishlistPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-black selection:bg-brand-gold selection:text-white overflow-x-hidden w-full">
      <Header />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />

      {/* Global Luxury Overlays */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;
