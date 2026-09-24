import React from 'react';
import { 
  Sprout, 
  Search, 
  ShoppingBag, 
  MapPin, 
  ShieldCheck, 
  Wheat, 
  Sparkles,
  Languages,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { formatCurrencyVND } from '@/utils/formatters';
import { TRANSLATIONS } from '@/constants/translations';
import { useAuth } from '@/context/AuthContext';
import UserDropdown from '@/components/Common/UserDropdown';

export default function Navbar({ 
  currentRole, 
  onRoleChange, 
  cartCount, 
  cartTotal, 
  onOpenCart, 
  onOpenMap,
  activeSection,
  setActiveSection,
  searchQuery,
  setSearchQuery,
  lang = 'en',
  onToggleLang,
  onOpenLogin,
  onOpenRegister,
}) {
  const t = TRANSLATIONS[lang];
  const { isLoggedIn } = useAuth();

  const roles = [
    { id: 'customer', label: t.roleCustomer, icon: ShoppingBag, color: '#1FA855', badge: 'Buyer' },
    { id: 'farmer', label: t.roleFarmer, icon: Wheat, color: '#FF7A30', badge: 'Farmer' },
    { id: 'admin', label: t.roleAdmin, icon: ShieldCheck, color: '#2563EB', badge: 'Admin' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full" style={{ padding: '16px 20px 8px' }}>
      <div 
        className="clay-card container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.96)',
          boxShadow: '0 8px 30px rgba(31, 168, 85, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.8)'
        }}
      >
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          onClick={() => setActiveSection('hero')}
        >
          <div 
            className="spin-3d-coin"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #1FA855 0%, #15803d 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 6px 14px rgba(31, 168, 85, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
              transform: 'rotate(-4deg)'
            }}
          >
            <Sprout size={24} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ 
                fontFamily: 'var(--font-header)', 
                fontSize: '22px', 
                fontWeight: '800', 
                letterSpacing: '-0.5px',
                color: '#1A3826' 
              }}>
                Market<span style={{ color: '#1FA855' }}>Link</span>
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#667085', margin: 0, fontWeight: 500 }}>
              {t.brandSub}
            </p>
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {[
            { id: 'hero', label: t.home },
            { id: 'map', label: t.nearbyMarkets, action: onOpenMap },
            { id: 'catalog', label: t.weeklyCatalog },
            { id: 'checkout', label: t.slotTicket },
            { id: 'dashboard', label: t.rbacDashboard },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setActiveSection(item.id);
                  }
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  border: 'none',
                  background: isActive ? 'rgba(31, 168, 85, 0.12)' : 'transparent',
                  color: isActive ? '#1FA855' : '#475467',
                  fontFamily: 'var(--font-header)',
                  fontWeight: isActive ? '700' : '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                {item.id === 'map' && <MapPin size={14} color="#1FA855" />}
                {item.label}
              </button>
            );
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', color: '#98A2B3' }} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '7px 12px 7px 34px',
                borderRadius: '999px',
                border: '1px solid rgba(31, 168, 85, 0.2)',
                background: '#F8FCF8',
                fontSize: '12px',
                outline: 'none',
                width: '160px',
                fontFamily: 'var(--font-data)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
                transition: 'width 0.2s ease',
              }}
              onFocus={(e) => (e.target.style.width = '195px')}
              onBlur={(e) => (e.target.style.width = '160px')}
            />
          </div>

          <button
            onClick={onToggleLang}
            title="Switch Language (English / Tiếng Việt)"
            className="clay-pill"
            style={{
              padding: '6px 12px',
              border: '1px solid rgba(31, 168, 85, 0.3)',
              background: '#ffffff',
              fontSize: '12px',
              fontWeight: '800',
              color: '#1FA855',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Languages size={14} />
            <span>{lang.toUpperCase()}</span>
          </button>

          {isLoggedIn ? (
            <UserDropdown />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={onOpenLogin}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '7px 14px',
                  borderRadius: '999px',
                  border: '1.5px solid rgba(31,168,85,0.35)',
                  background: '#ffffff',
                  color: '#1FA855',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  fontFamily: 'var(--font-header)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#F0FDF4'; e.currentTarget.style.borderColor = '#1FA855'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = 'rgba(31,168,85,0.35)'; }}
              >
                <LogIn size={14} />
                Đăng nhập
              </button>

              <button
                onClick={onOpenRegister}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  padding: '7px 14px',
                  borderRadius: '999px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #1FA855, #166534)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 3px 10px rgba(31,168,85,0.3)',
                  transition: 'all 0.15s',
                  fontFamily: 'var(--font-header)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 5px 16px rgba(31,168,85,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 10px rgba(31,168,85,0.3)'; }}
              >
                <UserPlus size={14} />
                Đăng ký
              </button>
            </div>
          )}

          <button
            onClick={onOpenCart}
            className="clay-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 12px',
              border: 'none',
              cursor: 'pointer',
              background: '#ffffff',
              borderRadius: '999px',
              boxShadow: '0 4px 12px rgba(31, 168, 85, 0.15)',
              position: 'relative'
            }}
          >
            <div style={{ position: 'relative' }}>
              <ShoppingBag size={17} color="#1FA855" />
              {cartCount > 0 && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    background: '#FF7A30',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: '800',
                    borderRadius: '999px',
                    padding: '1px 5px',
                    boxShadow: '0 2px 4px rgba(255, 122, 48, 0.4)'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1 }}>
              <span style={{ fontSize: '9px', color: '#667085', fontWeight: 600 }}>{t.cartSubtotal}</span>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#1FA855', fontFamily: 'var(--font-data)' }}>
                {formatCurrencyVND(cartTotal)}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
