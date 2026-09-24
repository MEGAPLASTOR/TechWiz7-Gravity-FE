import React, { useState, useEffect } from 'react';
import PureHero from '@/components/Hero/PureHero';
import ProductCatalog from '@/components/Catalog/ProductCatalog';
import SlotCheckout from '@/components/Checkout/SlotCheckout';
import Footer from '@/components/Footer/Footer';
import MarketMapModal from '@/components/Common/MarketMapModal';
import CartDrawer from '@/components/Common/CartDrawer';
import { useMarkets } from '@/hooks/useMarkets';
import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, Sprout, ShieldCheck, ArrowRight, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage({
  cartItems,
  setCartItems,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  cartCount,
  cartTotal,
  lang = 'en',
  onOpenLogin,
  onOpenRegister,
}) {
  const { currentRole, isLoggedIn, user, logout } = useAuth();
  const { markets } = useMarkets();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (!selectedMarket && markets && markets.length > 0) {
      setSelectedMarket(markets[0]);
    }
  }, [markets, selectedMarket]);

  const scrollToSection = (sectionId) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(`${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Pure Hero Section */}
      <PureHero
        onOpenMap={() => setIsMapModalOpen(true)}
        onExploreProducts={() => scrollToSection('catalog')}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
        cartTotal={cartTotal}
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          scrollToSection('catalog');
        }}
        currentRole={currentRole}
        onRoleChange={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigateSection={scrollToSection}
        isLoggedIn={isLoggedIn}
        user={user}
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
        onLogout={logout}
        selectedMarket={selectedMarket}
      />

      {/* Ecosystem Portals Navigation Cards */}
      <section style={{ background: '#19623D', padding: '0 20px 44px' }}>
        <div className="container">
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              borderRadius: '28px',
              padding: '28px 32px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.14)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    background: '#EAF4EC',
                    color: '#166534',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '6px',
                  }}
                >
                  <Store size={13} />
                  Tailored Community Portals
                </span>
                <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#101828' }}>
                  Choose Your Dedicated Marketplace Hub
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#667085' }}>
                  Seamless experiences designed for consumers, regional growers, and market administrators:
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {/* Customer Portal Link */}
              <Link
                to="/customer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 22px',
                  borderRadius: '20px',
                  background: '#F0FDF4',
                  border: '1.5px solid #86efac',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(31,168,85,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: '#1FA855',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(31,168,85,0.3)',
                    }}
                  >
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '16px', color: '#166534' }}>
                      Shopper Hub
                    </div>
                    <div style={{ fontSize: '12px', color: '#475467', marginTop: '2px' }}>
                      My pre-orders, pickup tickets & profile
                    </div>
                  </div>
                </div>
                <ArrowRight size={18} color="#1FA855" />
              </Link>

              {/* Farmer Portal Link */}
              <Link
                to="/farmer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 22px',
                  borderRadius: '20px',
                  background: '#FFF4ED',
                  border: '1.5px solid #fdba74',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(255,122,48,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: '#FF7A30',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(255,122,48,0.3)',
                    }}
                  >
                    <Sprout size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '16px', color: '#9A3412' }}>
                      Grower Merchant Hub
                    </div>
                    <div style={{ fontSize: '12px', color: '#475467', marginTop: '2px' }}>
                      Market stall counters & harvest quotas
                    </div>
                  </div>
                </div>
                <ArrowRight size={18} color="#FF7A30" />
              </Link>

              {/* Admin Portal Link */}
              <Link
                to="/admin"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 22px',
                  borderRadius: '20px',
                  background: '#EFF8FF',
                  border: '1.5px solid #93c5fd',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(37,99,235,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: '#2563EB',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
                    }}
                  >
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '16px', color: '#1E40AF' }}>
                      Operations Hub
                    </div>
                    <div style={{ fontSize: '12px', color: '#475467', marginTop: '2px' }}>
                      Market locations & vendor verification
                    </div>
                  </div>
                </div>
                <ArrowRight size={18} color="#2563EB" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog & Checkout Content */}
      <div style={{ background: 'var(--pastel-base)', width: '100%' }}>
        <ProductCatalog
          onAddToCart={onAddToCart}
          cartItems={cartItems}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedMarket={selectedMarket}
          onOpenMap={() => setIsMapModalOpen(true)}
          lang="en"
        />

        <SlotCheckout
          cartItems={cartItems}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
          selectedMarket={selectedMarket}
          onOpenMap={() => setIsMapModalOpen(true)}
          lang="en"
        />

        <Footer lang="en" />
      </div>

      <MarketMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        selectedMarket={selectedMarket}
        markets={markets}
        onSelectMarket={(market) => {
          setSelectedMarket(market);
          setIsMapModalOpen(false);
        }}
        lang="en"
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
        cartTotal={cartTotal}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          scrollToSection('checkout');
        }}
        lang="en"
      />
    </div>
  );
}
