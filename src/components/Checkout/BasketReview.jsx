import React from 'react';
import { ShoppingBag, Trash2, Plus, Sparkles, Loader2 } from 'lucide-react';
import { formatCurrencyVND } from '@/utils/formatters';

export default function BasketReview({
  cartItems = [],
  cartTotal = 0,
  onUpdateQuantity,
  onRemoveItem,
  isGeneratingTicket = false,
  onConfirmOrder,
  t
}) {
  return (
    <div 
      className="clay-card"
      style={{
        padding: '22px',
        borderRadius: '24px',
        background: '#ffffff'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: '#101828' }}>
          {t.basketReview}
        </h4>
        <span style={{ fontSize: '12px', color: '#1FA855', fontWeight: '700' }}>
          {cartItems.length} {t.items}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ padding: '24px', textAlign: 'center', color: '#667085', fontSize: '13px' }}>
          {t.emptyBasket}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {cartItems.map((item) => (
            <div 
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '14px',
                background: '#F9FAFB',
                border: '1px solid #F2F4F7'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>{item.image || item.image3D}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#101828' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#667085' }}>
                    {formatCurrencyVND(item.price)} / {item.unit}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: '#ffffff', borderRadius: '8px', border: '1px solid #E4E7EC' }}>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    style={{ padding: '4px 8px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '12px', fontWeight: '700', padding: '0 6px' }}>
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    style={{ padding: '4px 8px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
                  >
                    +
                  </button>
                </div>

                <div style={{ fontSize: '13px', fontWeight: '800', color: '#101828', minWidth: '70px', textAlign: 'right' }}>
                  {formatCurrencyVND(item.price * item.quantity)}
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  style={{ border: 'none', background: 'none', color: '#98A2B3', cursor: 'pointer', padding: '4px' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}

          <div style={{ height: '1px', background: '#E4E7EC', margin: '8px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#344054' }}>
              {t.totalPayAtStall}:
            </span>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#1FA855', fontFamily: 'var(--font-data)' }}>
              {formatCurrencyVND(cartTotal)}
            </span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onConfirmOrder}
        disabled={isGeneratingTicket || cartItems.length === 0}
        className="clay-btn-primary"
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '18px',
          fontSize: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
          opacity: cartItems.length === 0 ? 0.6 : 1
        }}
      >
        {isGeneratingTicket ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>{t.generatingPass}</span>
          </>
        ) : (
          <>
            <Sparkles size={18} />
            <span>{t.confirmAndCreateTicket}</span>
          </>
        )}
      </button>
    </div>
  );
}
