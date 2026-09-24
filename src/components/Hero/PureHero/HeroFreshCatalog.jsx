import React from 'react';
import { floatCard } from './styles';

export default function HeroFreshCatalog({ onNavigateSection }) {
  return (
    <div
      style={{
        ...floatCard({
          position: 'absolute',
          right: -14,
          top: 90,
          zIndex: 30,
          width: 100,
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 11,
          cursor: 'pointer',
          animation: 'heroFloat 6s ease-in-out infinite 1.2s',
        }),
      }}
      onClick={() => onNavigateSection && onNavigateSection('catalog')}
    >
      <span style={{ fontSize: 10, fontWeight: 800, color: '#166534', textAlign: 'center', lineHeight: 1.2 }}>
        Fresh<br />Catalog
      </span>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
        {['🥗', '🍅', '🍊', '🥕'].map((em, i) => (
          <div
            key={i}
            style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              boxShadow: '0 3px 8px rgba(0,0,0,0.09), inset 0 1px 2px rgba(255,255,255,0.9)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {em}
          </div>
        ))}
      </div>
    </div>
  );
}
