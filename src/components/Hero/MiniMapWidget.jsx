import React from 'react';
import { MapPin } from 'lucide-react';

export default function MiniMapWidget({ selectedMarket, onOpenMap, title = 'Mini Map', hubsCount = '4 Hubs' }) {
  return (
    <div 
      className="clay-card card-3d-tilt"
      onClick={onOpenMap}
      style={{
        position: 'absolute',
        bottom: '-22px',
        right: '25px',
        zIndex: 10,
        padding: '12px 16px',
        borderRadius: '22px',
        background: 'rgba(255, 255, 255, 0.96)',
        boxShadow: '0 14px 30px rgba(0, 0, 0, 0.14), inset 0 2px 4px #fff',
        width: '210px',
        cursor: 'pointer',
        border: '1px solid rgba(31, 168, 85, 0.25)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '11px', fontWeight: '800', color: '#1FA855', textTransform: 'uppercase' }}>
          {title}
        </span>
        <span style={{ fontSize: '10px', color: '#667085' }}>{hubsCount}</span>
      </div>

      <div 
        style={{
          width: '100%',
          height: '75px',
          borderRadius: '12px',
          background: '#EAF4EC',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(31, 168, 85, 0.2)'
        }}
      >
        <div style={{ position: 'absolute', width: '100%', height: '10px', top: '25px', background: '#d0ebd5' }} />
        <div style={{ position: 'absolute', width: '10px', height: '100%', left: '45px', background: '#d0ebd5' }} />
        <div style={{ position: 'absolute', width: '10px', height: '100%', left: '120px', background: '#d0ebd5' }} />
        <div style={{ position: 'absolute', width: '100%', height: '8px', top: '52px', background: '#d0ebd5' }} />

        <div 
          style={{
            position: 'absolute',
            top: '18px',
            left: '42px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: '#1FA855',
            boxShadow: '0 0 10px #1FA855',
            border: '2px solid #fff'
          }} 
        />
        <div 
          style={{
            position: 'absolute',
            top: '46px',
            left: '118px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#2dd56e',
            boxShadow: '0 0 8px #2dd56e',
            border: '2px solid #fff'
          }} 
        />
        <div 
          style={{
            position: 'absolute',
            top: '14px',
            right: '25px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#FF7A30',
            boxShadow: '0 0 8px #FF7A30',
            border: '2px solid #fff'
          }} 
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#101828' }}>
          {selectedMarket?.shortName || 'Can Tho Central'}
        </span>
        <span style={{ fontSize: '11px', color: '#1FA855', fontWeight: '800' }}>
          {selectedMarket?.distance || '1.2 km'}
        </span>
      </div>
    </div>
  );
}
