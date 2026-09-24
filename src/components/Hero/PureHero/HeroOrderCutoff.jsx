import React from 'react';
import { Clock } from 'lucide-react';
import { floatCard } from './styles';

export default function HeroOrderCutoff({ cutoff, onNavigateSection }) {
  return (
    <div
      style={{
        ...floatCard({
          position: 'absolute',
          right: 110,
          top: -20,
          zIndex: 35,
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          cursor: 'pointer',
          animation: 'heroFloatB 5.2s ease-in-out infinite 0.8s',
        }),
      }}
      onClick={() => onNavigateSection('checkout')}
    >
      <div>
        <div style={{ fontSize: 10, color: '#667085', fontWeight: 600, marginBottom: 2 }}>
          <Clock size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          Order Cutoff
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            fontFamily: 'var(--font-data)',
            letterSpacing: 1,
            animation: 'countdownPulse 2s ease-in-out infinite',
          }}
        >
          {cutoff}
        </div>
      </div>
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          background: 'linear-gradient(135deg, #e2f5e9 0%, #c3e8d0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.7), 0 4px 10px rgba(31,168,85,0.12)',
        }}
      >
        🧺
      </div>
    </div>
  );
}
