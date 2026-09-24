import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { formatCurrencyVND } from '@/utils/formatters';

export default function MiniCartWidget({ cartItems = [], cartTotal = 0, lang = 'en', onOpenCart }) {
  return (
    <div 
      className="clay-card animate-float"
      onClick={onOpenCart}
      style={{
        position: 'absolute',
        bottom: '-20px',
        left: '52%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        padding: '10px 18px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.96)',
        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12), inset 0 2px 4px #fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        border: '1px solid rgba(31, 168, 85, 0.25)',
        cursor: 'pointer',
        minWidth: '170px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', fontWeight: '800', color: '#1FA855' }}>
          Mini Cart
        </span>
        <ShoppingCart size={14} color="#1FA855" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '18px' }}>
          <span>📦</span>
          <span>🍅</span>
          <span>🍊</span>
        </div>
        <div style={{ height: '20px', width: '1px', background: '#E4E7EC' }} />
        <div>
          <div style={{ fontSize: '9px', color: '#667085' }}>
            {cartItems.length} items
          </div>
          <div style={{ fontSize: '13px', fontWeight: '800', color: '#1FA855' }}>
            {formatCurrencyVND(cartTotal || 620000)}
          </div>
        </div>
      </div>
    </div>
  );
}
