import React from 'react';
import { Clock } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';

export default function OrderCutoff({ cutoffTitle = 'Order Cutoff:' }) {
  const { formattedDigital, isUrgent } = useCountdown(2, 15, 0);

  return (
    <div 
      className="clay-card animate-float-delayed"
      style={{
        position: 'absolute',
        top: '-18px',
        right: '30px',
        zIndex: 10,
        padding: '10px 18px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12), inset 0 2px 4px #fff',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        border: isUrgent ? '2px solid #FF7A30' : '1px solid rgba(31, 168, 85, 0.3)'
      }}
    >
      <div 
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '12px',
          background: isUrgent ? 'rgba(255, 122, 48, 0.15)' : 'rgba(31, 168, 85, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px'
        }}
      >
        🧺
      </div>
      <div>
        <div style={{ fontSize: '11px', color: '#667085', fontWeight: 600 }}>
          {cutoffTitle}
        </div>
        <div 
          style={{
            fontSize: '17px',
            fontWeight: '800',
            color: isUrgent ? '#FF7A30' : '#101828',
            fontFamily: 'monospace',
            letterSpacing: '0.5px'
          }}
        >
          {formattedDigital}
        </div>
      </div>
    </div>
  );
}
