import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { ShieldAlert, LogIn, ArrowRight, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RoleGuard({ requiredRole, children, onOpenLogin }) {
  const { isLoggedIn, currentRole, user } = useAuth();

  const roleNameMap = {
    customer: 'Customer Account',
    farmer: 'Verified Grower',
    admin: 'Market Operations Manager',
  };

  const roleTheme = {
    customer: { color: '#1FA855', bg: '#F0FDF4', border: '#86efac' },
    farmer: { color: '#FF7A30', bg: '#FFF4ED', border: '#fdba74' },
    admin: { color: '#2563EB', bg: '#EFF8FF', border: '#93c5fd' },
  }[requiredRole] || { color: '#1FA855', bg: '#F0FDF4', border: '#86efac' };

  // Not logged in
  if (!isLoggedIn) {
    return (
      <div className="container" style={{ padding: '60px 20px', maxWidth: '640px' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: '28px',
            border: `1.5px solid ${roleTheme.border}`,
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: '0 16px 40px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: roleTheme.bg,
              color: roleTheme.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <ShieldAlert size={32} />
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#101828', marginBottom: '8px' }}>
            Account Authentication Required
          </h2>
          <p style={{ fontSize: '15px', color: '#475467', lineHeight: 1.6, marginBottom: '28px' }}>
            This workspace is reserved for authorized <strong>{roleNameMap[requiredRole]}</strong> members.
            Please sign in with your credentials to manage your agricultural operations.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenLogin}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: `linear-gradient(135deg, ${roleTheme.color}, #166534)`,
                color: '#ffffff',
                border: 'none',
                borderRadius: '14px',
                padding: '12px 26px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              }}
            >
              <LogIn size={16} />
              <span>Sign In with Account</span>
            </button>

            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#F2F4F7',
                color: '#344054',
                borderRadius: '14px',
                padding: '12px 22px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <Store size={16} />
              <span>Return to Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Logged in but insufficient role permissions
  if (currentRole !== requiredRole && currentRole !== 'admin') {
    return (
      <div className="container" style={{ padding: '60px 20px', maxWidth: '640px' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: '28px',
            border: '1.5px solid #FECDCA',
            padding: '40px 32px',
            textAlign: 'center',
            boxShadow: '0 16px 40px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: '#FEF3F2',
              color: '#D92D20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <ShieldAlert size={32} />
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#101828', marginBottom: '8px' }}>
            Access Restricted
          </h2>
          <p style={{ fontSize: '15px', color: '#475467', lineHeight: 1.6, marginBottom: '24px' }}>
            You are currently signed in as <strong>{user?.fullName || user?.email}</strong> with role{' '}
            <span
              style={{
                background: '#F2F4F7',
                padding: '3px 10px',
                borderRadius: '8px',
                fontWeight: 700,
                color: '#101828',
              }}
            >
              {currentRole?.toUpperCase()}
            </span>
            . This portal is only accessible to <strong>{roleNameMap[requiredRole]}</strong> accounts.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              to={`/${currentRole}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#1FA855',
                color: '#ffffff',
                borderRadius: '14px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(31,168,85,0.3)',
              }}
            >
              <span>Go to My Workspace</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#F2F4F7',
                color: '#344054',
                borderRadius: '14px',
                padding: '12px 22px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <Store size={16} />
              <span>Browse Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
