import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, ShieldCheck, Sprout, ShoppingBag, ChevronDown, Store, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function UserDropdown() {
  const { user, currentRole, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const ROLE_META = {
    admin:    { label: 'Market Operations', icon: ShieldCheck, color: '#2563EB', bg: '#EFF8FF', emoji: '🛡️', portalPath: '/admin', portalLabel: 'Operations Hub' },
    farmer:   { label: 'Verified Grower',   icon: Sprout,      color: '#FF7A30', bg: '#FFF4ED', emoji: '👨‍🌾', portalPath: '/farmer', portalLabel: 'Grower Portal' },
    customer: { label: 'Customer Member',   icon: ShoppingBag, color: '#1FA855', bg: '#F0FDF4', emoji: '🛒', portalPath: '/customer', portalLabel: 'My Orders & Passes' },
  };

  const meta = ROLE_META[currentRole] || ROLE_META.customer;
  const RoleIcon = meta.icon;

  const initials = (user?.fullName || user?.email || 'U')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate('/');
  };

  return (
    <div ref={ref} style={{ position: 'relative', userSelect: 'none' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '5px 12px 5px 5px',
          borderRadius: '999px',
          border: `1.5px solid ${open ? meta.color : 'rgba(31,168,85,0.25)'}`,
          background: open ? meta.bg : '#ffffff',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: open ? `0 0 0 3px ${meta.color}22` : '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)`,
          color: '#fff', fontSize: '12px', fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 2px 6px ${meta.color}44`,
        }}>
          {user?.avatarUrl
            ? <img src={user.avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            : initials
          }
        </div>

        <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#101828', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.fullName || 'User Account'}
          </div>
          <div style={{ fontSize: '10px', color: meta.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
            <RoleIcon size={10} />
            {meta.label}
          </div>
        </div>

        <ChevronDown
          size={14}
          color="#667085"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
        />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          minWidth: '260px',
          background: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
          zIndex: 500,
          overflow: 'hidden',
          animation: 'dropDown 0.18s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          {/* Header Info */}
          <div style={{
            background: `linear-gradient(135deg, ${meta.bg}, #ffffff)`,
            padding: '16px',
            borderBottom: '1px solid #F2F4F7',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)`,
                color: '#fff', fontSize: '16px', fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 4px 12px ${meta.color}44`,
                flexShrink: 0,
              }}>
                {user?.avatarUrl
                  ? <img src={user.avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  : initials
                }
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontWeight: 800, fontSize: '14px', color: '#101828', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.fullName || 'User Account'}
                </div>
                <div style={{ fontSize: '12px', color: '#667085', marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.email}
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  marginTop: '5px', background: meta.bg, color: meta.color,
                  fontSize: '11px', fontWeight: 700, padding: '2px 8px',
                  borderRadius: '99px', border: `1px solid ${meta.color}33`,
                }}>
                  {meta.emoji} {meta.label}
                  {user?.kycStatus === 'VERIFIED' && (
                    <ShieldCheck size={11} style={{ marginLeft: '2px' }} />
                  )}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#667085', background: '#F2F4F7', padding: '2px 8px', borderRadius: '99px' }}>
                Account ID: #{user?.userId || '01'}
              </span>
              <span style={{
                fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '99px',
                background: '#ECFDF3', color: '#027A48',
              }}>
                ✓ Active
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div style={{ padding: '8px' }}>
            <Link
              to="/"
              onClick={() => setOpen(false)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '9px 12px', borderRadius: '10px',
                color: '#344054', textDecoration: 'none', transition: 'background 0.12s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F9FAFB')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#EAF4EC', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Store size={14} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#166534' }}>Storefront Marketplace</div>
                  <div style={{ fontSize: '11px', color: '#667085' }}>Explore fresh regional harvests</div>
                </div>
              </div>
              <ArrowRight size={14} color="#1FA855" />
            </Link>

            <Link
              to={meta.portalPath}
              onClick={() => setOpen(false)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '9px 12px', borderRadius: '10px', marginTop: '2px',
                color: '#344054', textDecoration: 'none', transition: 'background 0.12s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F9FAFB')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: meta.bg, color: meta.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RoleIcon size={14} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: meta.color }}>{meta.portalLabel}</div>
                  <div style={{ fontSize: '11px', color: '#667085' }}>Manage your workspace</div>
                </div>
              </div>
              <ArrowRight size={14} color={meta.color} />
            </Link>
          </div>

          <div style={{ borderTop: '1px solid #F2F4F7', padding: '6px' }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 12px', borderRadius: '10px', border: 'none',
                background: 'transparent', cursor: 'pointer', textAlign: 'left',
                color: '#D92D20', transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#FEF3F2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px',
                background: '#FEE4E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <LogOut size={14} color="#D92D20" />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700 }}>Sign Out</div>
                <div style={{ fontSize: '11px', color: '#FDA29B' }}>End your active session</div>
              </div>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </div>
  );
}
