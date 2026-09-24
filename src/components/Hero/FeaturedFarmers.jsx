import React, { useState } from 'react';

export default function FeaturedFarmers({ featuredFarmers = [], title = 'Featured\nFarmers' }) {
  const [activeFarmerHover, setActiveFarmerHover] = useState(null);

  if (!featuredFarmers || featuredFarmers.length === 0) return null;

  return (
    <>
      <div 
        className="clay-card animate-float"
        style={{
          position: 'absolute',
          left: '-16px',
          top: '50px',
          padding: '12px 14px',
          borderRadius: '22px',
          background: 'rgba(255, 255, 255, 0.94)',
          boxShadow: '0 10px 24px rgba(0, 0, 0, 0.1), inset 2px 2px 5px #fff',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          width: '84px'
        }}
      >
        <span style={{ fontSize: '10px', fontWeight: '800', color: '#1FA855', textAlign: 'center', lineHeight: 1.1, whiteSpace: 'pre-line' }}>
          {title}
        </span>
        {featuredFarmers.slice(0, 4).map((f) => (
          <div 
            key={f.id}
            style={{ position: 'relative', cursor: 'pointer', transformStyle: 'preserve-3d', transition: 'transform 0.2s ease' }}
            onMouseEnter={() => setActiveFarmerHover(f)}
            onMouseLeave={() => setActiveFarmerHover(null)}
          >
            <img 
              src={f.avatar} 
              alt={f.name}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #1FA855',
                boxShadow: '0 4px 10px rgba(31, 168, 85, 0.3)'
              }} 
            />
            <span 
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                background: '#1FA855',
                color: '#fff',
                borderRadius: '50%',
                width: '15px',
                height: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                border: '1.5px solid #fff'
              }}
            >
              ✓
            </span>
          </div>
        ))}
      </div>

      {activeFarmerHover && (
        <div 
          className="clay-card"
          style={{
            position: 'absolute',
            left: '74px',
            top: '90px',
            zIndex: 20,
            padding: '12px 16px',
            borderRadius: '16px',
            background: '#ffffff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
            minWidth: '200px'
          }}
        >
          <div style={{ fontWeight: '700', fontSize: '14px', color: '#1D2939' }}>
            {activeFarmerHover.name}
          </div>
          <div style={{ fontSize: '12px', color: '#1FA855', fontWeight: 600 }}>
            {activeFarmerHover.farmName}
          </div>
          <div style={{ fontSize: '11px', color: '#667085', marginTop: '4px' }}>
            🏅 {activeFarmerHover.badge} • ⭐ {activeFarmerHover.rating}
          </div>
        </div>
      )}
    </>
  );
}
