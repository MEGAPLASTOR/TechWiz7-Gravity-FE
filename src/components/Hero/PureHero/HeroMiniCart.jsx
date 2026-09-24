import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { formatCurrencyVND } from '@/utils/formatters';
import { floatCard } from './styles';

export default function HeroMiniCart({ onOpenCart, cartCount, cartTotal }) {
  return (
    <div
      style={{
        ...floatCard({
          position: 'absolute',
          bottom: -32,
          right: 310,
          zIndex: 35,
          padding: '14px 20px',
          cursor: 'pointer',
          minWidth: 186,
          animation: 'heroFloat 5.8s ease-in-out infinite 0.5s',
        }),
      }}
      onClick={onOpenCart}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: '#101828' }}>Mini Cart</span>
        <div
          style={{
            background: '#E2F3E7',
            borderRadius: 999,
            width: 26,
            height: 26,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ShoppingCart size={14} color="#166534" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        {['🥗', '🍅', '🍊'].map((item, i) => (
          <div
            key={i}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
            }}
          >
            {item}
          </div>
        ))}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: '#EDF6EF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 800,
            color: '#166534',
            boxShadow: '0 3px 8px rgba(0,0,0,0.06)',
          }}
        >
          +{cartCount || 2}
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#667085', fontWeight: 600 }}>
        Subtotal:{' '}
        <strong style={{ color: '#166534', fontSize: 13 }}>
          {formatCurrencyVND(cartTotal || 580000)}
        </strong>
      </div>
    </div>
  );
}
