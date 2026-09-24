import React from 'react';
import { ArrowRight, Map } from 'lucide-react';

export default function HeroHeadline({ onExploreProducts, onOpenMap, selectedMarket }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        paddingLeft: 16,
        zIndex: 10,
      }}
    >
      <div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: '#E2F3E7',
            borderRadius: 999,
            padding: '5px 14px',
            marginBottom: 16,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1FA855', boxShadow: '0 0 6px #1FA855', display: 'block' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#166534' }}>
            {selectedMarket?.name ? `Live · ${selectedMarket.name}` : 'Live · Farmers Market'}
          </span>
        </div>

        <h1
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: '#101828',
            lineHeight: 1.12,
            letterSpacing: '-1.8px',
            fontFamily: 'var(--font-header)',
            margin: 0,
          }}
        >
          Local Farmers<br />
          Market –{' '}
          <span style={{ color: '#1FA855' }}>Pre-Order</span>
          <br />
          &amp; Pay At Pickup
        </h1>

        <p
          style={{
            fontSize: 15,
            color: '#475467',
            marginTop: 16,
            lineHeight: 1.65,
            maxWidth: 380,
            fontFamily: 'var(--font-data)',
          }}
        >
          Reserve fresh produce from verified Mekong Delta farmers. 
          Pick up at your nearest market hub — no online payment required.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          onClick={onExploreProducts}
          className="clay-btn-primary"
          style={{
            padding: '14px 36px',
            fontSize: 16,
            borderRadius: 18,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            boxShadow: '0 10px 28px rgba(21,101,52,0.42), inset 0 2px 4px rgba(255,255,255,0.3)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
        >
          Explore Now <ArrowRight size={18} />
        </button>

        <button
          onClick={onOpenMap}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '13px 22px',
            borderRadius: 18,
            border: '1.5px solid rgba(31,168,85,0.3)',
            background: 'rgba(31,168,85,0.06)',
            color: '#166534',
            fontFamily: 'var(--font-header)',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#e2f3e7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(31,168,85,0.06)'; }}
        >
          <Map size={16} /> Find Markets
        </button>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[
          { icon: '✅', label: 'VietGAP Certified' },
          { icon: '🚚', label: 'Same-day pickup' },
          { icon: '🔒', label: 'Pay at counter' },
        ].map((b) => (
          <div
            key={b.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: '#F6FBF7',
              border: '1px solid rgba(31,168,85,0.18)',
              borderRadius: 999,
              padding: '5px 13px',
            }}
          >
            <span style={{ fontSize: 14 }}>{b.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#344054' }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
