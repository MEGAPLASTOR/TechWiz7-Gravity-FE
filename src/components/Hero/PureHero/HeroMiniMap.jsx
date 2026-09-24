import React from 'react';
import { Map } from 'lucide-react';
import { floatCard } from './styles';
import IsoMap from './IsoMap';

export default function HeroMiniMap({ onOpenMap }) {
  return (
    <div
      style={{
        ...floatCard({
          position: 'absolute',
          bottom: -36,
          right: 16,
          zIndex: 35,
          width: 262,
          padding: '16px 18px',
          cursor: 'pointer',
          animation: 'heroFloatB 6.2s ease-in-out infinite 1.5s',
        }),
      }}
      onClick={onOpenMap}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Map size={13} color="#166634" />
          <span style={{ fontSize: 12, fontWeight: 800, color: '#101828' }}>Market Map</span>
        </div>
        <span
          style={{
            fontSize: 10,
            color: '#fff',
            fontWeight: 700,
            background: '#1FA855',
            borderRadius: 999,
            padding: '2px 9px',
            boxShadow: '0 3px 8px rgba(31,168,85,0.35)',
          }}
        >
          4 Hubs Active
        </span>
      </div>
      <IsoMap />
      <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
        {['Ninh Kieu', 'Cai Rang', 'O Mon', 'Binh Thuy'].map((hub) => (
          <span
            key={hub}
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: '#166534',
              background: '#e6f5ec',
              borderRadius: 999,
              padding: '2px 8px',
            }}
          >
            📍 {hub}
          </span>
        ))}
      </div>
    </div>
  );
}
