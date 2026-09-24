import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Leaf, ChevronDown, ShieldCheck, LogOut, LogIn, UserPlus, ShoppingBag, Sprout, Store, ArrowRight } from 'lucide-react';
import { glass } from './styles';

export default function HeroNavbar({
  searchQuery,
  setSearchQuery,
  onNavigateSection,
  onOpenMap,
  isLoggedIn,
  user,
  currentRole,
  onOpenLogin,
  onOpenRegister,
  onLogout
}) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Dynamic Navigation according to Role
  const getNavLinks = () => {
    if (currentRole === 'farmer') {
      return [
        { label: 'Storefront', action: () => onNavigateSection('hero'), active: true },
        { label: 'Fresh Produce', action: () => onNavigateSection('catalog'), active: false },
        { label: 'Grower Portal', action: () => navigate('/farmer'), active: false, badge: '🌾' },
        { label: 'Nearby Hubs', action: onOpenMap, active: false },
      ];
    }
    if (currentRole === 'admin') {
      return [
        { label: 'Storefront', action: () => onNavigateSection('hero'), active: true },
        { label: 'Fresh Produce', action: () => onNavigateSection('catalog'), active: false },
        { label: 'Operations Hub', action: () => navigate('/admin'), active: false, badge: '🛡️' },
        { label: 'Nearby Hubs', action: onOpenMap, active: false },
      ];
    }
    // Default / Customer
    return [
      { label: 'Home', action: () => onNavigateSection('hero'), active: true },
      { label: 'Nearby Hubs', action: onOpenMap, active: false },
      { label: 'Fresh Produce', action: () => onNavigateSection('catalog'), active: false },
      { label: 'Pickup Pass', action: () => onNavigateSection('checkout'), active: false },
      ...(isLoggedIn ? [{ label: 'My Orders', action: () => navigate('/customer'), active: false, badge: '📦' }] : []),
    ];
  };

  const navLinks = getNavLinks();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
        <div
          style={{
            width: 380,
            maxWidth: '92%',
            ...glass(0.88),
            borderRadius: 999,
            padding: '7px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,0.14), inset 0 1.5px 3px rgba(255,255,255,0.95)',
          }}
        >
          <Search size={16} color="#667085" style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search fresh harvest, varieties, growers…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: 13,
              color: '#344054',
              width: '100%',
              fontFamily: 'var(--font-data)',
            }}
          />
        </div>
      </div>

      <div
        style={{
          background: '#ffffff',
          borderRadius: 28,
          padding: '11px 26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 16px 42px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.06), inset 0 2px 4px rgba(255,255,255,0.9)',
          marginBottom: 30,
          position: 'relative',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          onClick={() => onNavigateSection('hero')}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 11,
              background: 'linear-gradient(135deg, #25ba5f 0%, #1FA855 60%, #136934 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 5px 14px rgba(31,168,85,0.42), inset 0 2px 3px rgba(255,255,255,0.35)',
            }}
          >
            <Leaf size={20} strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'var(--font-header)', fontSize: 22, fontWeight: 800, color: '#101828', letterSpacing: '-0.5px' }}>
            Market<span style={{ color: '#1FA855' }}>Link</span>
          </span>
        </div>

        {/* Navigation according to Role */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navLinks.map((n) => (
            <button
              key={n.label}
              onClick={n.action}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                border: 'none',
                background: n.active ? '#E2F3E7' : 'transparent',
                color: n.active ? '#166534' : '#475467',
                fontFamily: 'var(--font-header)',
                fontWeight: n.active ? 700 : 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
              onMouseEnter={(e) => { if (!n.active) e.currentTarget.style.color = '#1FA855'; }}
              onMouseLeave={(e) => { if (!n.active) e.currentTarget.style.color = '#475467'; }}
            >
              {n.badge && <span>{n.badge}</span>}
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        {isLoggedIn ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              style={{
                background: 'linear-gradient(135deg, #1FA855 0%, #136934 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: '6px 14px 6px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                fontSize: 13,
                boxShadow: '0 5px 16px rgba(21,101,52,0.38)',
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: '#ffffff',
                  color: '#1FA855',
                  fontWeight: 800,
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(255,255,255,0.85)',
                }}
              >
                {user?.fullName ? user.fullName.slice(0, 2).toUpperCase() : 'U'}
              </div>
              <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                <div style={{ maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.fullName || 'User Account'}
                </div>
                <div style={{ fontSize: 10, opacity: 0.85 }}>
                  {currentRole === 'farmer' ? 'GROWER' : currentRole === 'admin' ? 'OPERATIONS' : 'CUSTOMER'}
                </div>
              </div>
              <ChevronDown size={14} style={{ transform: isProfileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {isProfileOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 50,
                  right: 0,
                  width: 260,
                  background: '#ffffff',
                  borderRadius: 20,
                  padding: '14px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.22)',
                  zIndex: 60,
                  border: '1px solid rgba(31,168,85,0.18)',
                }}
              >
                <div style={{ borderBottom: '1px solid #F2F4F7', paddingBottom: 10, marginBottom: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#101828' }}>
                    {user?.fullName || 'Active User'}
                  </div>
                  <div style={{ fontSize: 12, color: '#667085', marginTop: 2, wordBreak: 'break-all' }}>
                    {user?.email}
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#F0FDF4', color: '#1FA855', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700, marginTop: 6 }}>
                    ✓ {currentRole === 'farmer' ? 'Verified Grower' : currentRole === 'admin' ? 'Operations Admin' : 'Customer Account'}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
                  {currentRole === 'farmer' ? (
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate('/farmer');
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: 'none',
                        background: '#FFF4ED',
                        color: '#C4320A',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Sprout size={16} color="#FF7A30" />
                        <span>Grower Merchant Portal</span>
                      </div>
                      <ArrowRight size={14} />
                    </button>
                  ) : currentRole === 'admin' ? (
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate('/admin');
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: 'none',
                        background: '#EFF8FF',
                        color: '#1E40AF',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ShieldCheck size={16} color="#2563EB" />
                        <span>Market Operations Hub</span>
                      </div>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate('/customer');
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '9px 12px',
                        borderRadius: 10,
                        border: 'none',
                        background: '#F0FDF4',
                        color: '#166534',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ShoppingBag size={16} color="#1FA855" />
                        <span>My Orders & Pickup Passes</span>
                      </div>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    if (onLogout) onLogout();
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderRadius: 10,
                    border: 'none',
                    background: '#FEF3F2',
                    color: '#D92D20',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={onOpenLogin}
              style={{
                background: '#ffffff',
                color: '#166534',
                border: '1.5px solid #1FA855',
                borderRadius: 999,
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                fontSize: 13,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#F0FDF4'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; }}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>

            <button
              onClick={onOpenRegister}
              style={{
                background: 'linear-gradient(135deg, #1FA855 0%, #166534 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: '8px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                fontSize: 13,
                boxShadow: '0 5px 16px rgba(21,101,52,0.38)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
            >
              <UserPlus size={15} />
              <span>Join Marketplace</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
