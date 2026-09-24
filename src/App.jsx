import React, { useState } from 'react';
import AppRoutes from '@/routes/AppRoutes';
import SupportAssistant from '@/components/Assistant/SupportAssistant';
import LoadingScreen from '@/components/Common/LoadingScreen';
import AuthModal from '@/components/Common/AuthModal';
import { useMarkets } from '@/hooks/useMarkets';

export default function App() {
  const { markets } = useMarkets();
  const [lang, setLang] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');

  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const selectedMarket = markets && markets.length > 0 ? markets[0] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--pastel-base)' }}>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} duration={1200} />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />

      <AppRoutes
        cartItems={cartItems}
        setCartItems={setCartItems}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        cartCount={cartCount}
        cartTotal={cartTotal}
        lang={lang}
        onOpenLogin={() => openAuthModal('login')}
        onOpenRegister={() => openAuthModal('register')}
      />

      <SupportAssistant selectedMarket={selectedMarket} lang={lang} />
    </div>
  );
}
