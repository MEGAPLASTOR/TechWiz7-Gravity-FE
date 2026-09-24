import React, { useState } from 'react';
import { floatCard } from './styles';

export default function HeroFeaturedFarmers({ farmers = [] }) {
  const [hoveredFarmer, setHoveredFarmer] = useState(null);

  if (!farmers || farmers.length === 0) return null;

  return (
    <>
      <div
        style={{
          ...floatCard({
            position: 'absolute',
            left: -12,
            top: 80,
            zIndex: 30,
            width: 90,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 13,
            animation: 'heroFloat 5.5s ease-in-out infinite',
          }),
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 800, color: '#166534', textAlign: 'center', lineHeight: 1.2 }}>
          Featured<br />Farmers
        </span>
        {farmers.map((f) => (
          <div
            key={f.id}
            style={{ position: 'relative', cursor: 'pointer' }}
            onMouseEnter={() => setHoveredFarmer(f)}
            onMouseLeave={() => setHoveredFarmer(null)}
          >
            <img
              src={f.avatar}
              alt={f.name}
              style={{
                width: 46,
                height: 46,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2.5px solid #1FA855',
                boxShadow: '0 5px 14px rgba(31,168,85,0.35)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: -3,
                right: -3,
                background: '#1FA855',
                color: '#fff',
                width: 16,
                height: 16,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 9,
                border: '2px solid #fff',
                boxShadow: '0 2px 6px rgba(31,168,85,0.4)',
              }}
            >
              ✓
            </span>
          </div>
        ))}
      </div>

      {hoveredFarmer && (
        <div
          style={{
            position: 'absolute',
            left: 88,
            top: 110,
            zIndex: 50,
            background: '#fff',
            borderRadius: 16,
            padding: '10px 14px',
            boxShadow: '0 14px 36px rgba(0,0,0,0.22)',
            border: '1px solid rgba(31,168,85,0.2)',
            minWidth: 160,
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 13, color: '#101828' }}>{hoveredFarmer.name}</div>
          <div style={{ fontSize: 11, color: '#1FA855', fontWeight: 600 }}>{hoveredFarmer.farm}</div>
        </div>
      )}
    </>
  );
}
