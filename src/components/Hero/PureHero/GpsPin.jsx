import React from 'react';
import { Store } from 'lucide-react';

export default function GpsPin({ onClick }) {
  return (
    <div
      style={{ position: 'relative', width: 80, height: 80, cursor: 'pointer' }}
      onClick={onClick}
      title="Can Tho Central Market Hub"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid rgba(31,168,85,0.55)',
            animation: `pingRipple 2.4s ease-out ${i * 0.8}s infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 8,
          width: 64,
          height: 64,
          borderRadius: '50% 50% 50% 6px',
          transform: 'rotate(-45deg)',
          background: 'radial-gradient(circle at 35% 35%, #3ddc84 0%, #1FA855 55%, #0f5c2e 100%)',
          boxShadow:
            '0 10px 28px rgba(31,168,85,0.55), inset 0 3px 6px rgba(255,255,255,0.5), inset -2px -2px 6px rgba(0,0,0,0.15)',
          border: '3px solid #ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Store
          size={26}
          color="#ffffff"
          strokeWidth={2.5}
          style={{ transform: 'rotate(45deg)' }}
        />
      </div>
    </div>
  );
}
