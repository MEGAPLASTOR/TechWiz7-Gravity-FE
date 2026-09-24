import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, ShoppingBag, Sprout, ShieldCheck, ArrowLeft, Store } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import UserDropdown from './UserDropdown';

export default function PortalNavbar({ onOpenLogin, onOpenRegister }) {
  const location = useLocation();
  const { isLoggedIn, currentRole } = useAuth();

  const isCustomerPath = location.pathname.startsWith('/customer');
  const isFarmerPath = location.pathname.startsWith('/farmer');
  const isAdminPath = location.pathname.startsWith('/admin');

  // Role-tailored navigation items
  const getNavItems = () => {
    if (isFarmerPath) {
      return [
        { path: '/farmer', label: 'Stall Allocations', icon: Sprout, color: '#FF7A30' },
        { path: '/', label: 'Storefront Catalog', icon: Store, color: '#166534' },
      ];
    }
    if (isAdminPath) {
      return [
        { path: '/admin', label: 'Operations Hub', icon: ShieldCheck, color: '#2563EB' },
        { path: '/', label: 'Live Storefront', icon: Store, color: '#166534' },
      ];
    }
    // Customer Portal by default
    return [
      { path: '/customer', label: 'My Orders & Passes', icon: ShoppingBag, color: '#1FA855' },
      { path: '/', label: 'Fresh Marketplace', icon: Store, color: '#166534' },
    ];
  };

  const navItems = getNavItems();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(31, 168, 85, 0.15)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
          gap: '16px',
        }}
      >
        {/* Brand & Back Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link
            to="/"
            title="Return to Marketplace Storefront"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #25ba5f 0%, #1FA855 60%, #136934 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(31,168,85,0.3)',
              }}
            >
              <Leaf size={22} strokeWidth={2.5} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-header)',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#101828',
                  lineHeight: 1.1,
                }}
              >
                Market<span style={{ color: '#1FA855' }}>Link</span>
              </span>
              <span style={{ fontSize: '11px', color: '#166534', fontWeight: 700 }}>
                {isFarmerPath ? 'Grower Merchant Hub' : isAdminPath ? 'Market Operations Portal' : 'Customer Account Hub'}
              </span>
            </div>
          </Link>

          {/* Quick Back to Storefront Link */}
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: '#F0FDF4',
              border: '1px solid #bbf7d0',
              color: '#166534',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#dcfce7')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#F0FDF4')}
          >
            <ArrowLeft size={14} />
            <span>Back to Storefront</span>
          </Link>
        </div>

        {/* Role-Specific Navigation Tabs */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#F2F4F7',
            padding: '4px',
            borderRadius: '999px',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 16px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? item.color : '#475467',
                  background: isActive ? '#ffffff' : 'transparent',
                  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                <Icon size={15} color={isActive ? item.color : '#667085'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isLoggedIn ? (
            <UserDropdown />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={onOpenLogin}
                style={{
                  background: '#ffffff',
                  color: '#166534',
                  border: '1.5px solid #1FA855',
                  borderRadius: '999px',
                  padding: '7px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Sign In
              </button>
              <button
                onClick={onOpenRegister}
                style={{
                  background: 'linear-gradient(135deg, #1FA855 0%, #166534 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '7px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(31,168,85,0.3)',
                }}
              >
                Join Now
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
