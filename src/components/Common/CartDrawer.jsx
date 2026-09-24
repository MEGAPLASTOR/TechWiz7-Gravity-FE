import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';
import { formatCurrencyVND } from '@/utils/formatters';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  cartTotal, 
  onProceedCheckout,
  lang = 'en'
}) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 45, 25, 0.6)',
        backdropFilter: 'blur(6px)',
        zIndex: 110,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'all 0.3s ease'
      }}
      onClick={onClose}
    >
      <div 
        className="clay-card card-3d-tilt"
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          background: '#ffffff',
          borderRadius: '32px 0 0 32px',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.25)',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{
                background: '#EAF4EC',
                color: '#1FA855',
                padding: '8px',
                borderRadius: '12px'
              }}
            >
              <ShoppingBag size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', margin: 0, color: '#101828' }}>
                {lang === 'en' ? 'Fresh Pre-Order Basket' : 'Giỏ Nông Sản Đặt Trước'}
              </h3>
              <p style={{ fontSize: '12px', color: '#667085', margin: 0 }}>
                {cartItems.length} {lang === 'en' ? 'farm items selected' : 'loại sản phẩm đã chọn'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#F2F4F7',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#667085'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div 
          style={{
            background: '#F0FDF4',
            border: '1px solid #bbf7d0',
            padding: '8px 12px',
            borderRadius: '12px',
            fontSize: '11px',
            color: '#15803d',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '16px'
          }}
        >
          <ShieldCheck size={14} color="#1FA855" />
          <span>
            {lang === 'en' 
              ? 'Pay-At-Pickup: Zero platform fees • Settle directly at stall' 
              : 'Pay-At-Pickup: Không tính phí giao dịch, thanh toán tại chợ'}
          </span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#667085' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🧺</div>
              <h4 style={{ fontSize: '16px', color: '#101828', marginBottom: '6px' }}>
                {lang === 'en' ? 'Your basket is currently empty' : 'Giỏ hàng của bạn đang trống'}
              </h4>
              <p style={{ fontSize: '13px' }}>
                {lang === 'en' ? 'Select freshly harvested produce from our weekly catalog!' : 'Hãy chọn các loại rau củ hữu cơ từ danh mục nông sản sạch tuần này!'}
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.id}
                className="clay-card"
                style={{
                  padding: '14px 16px',
                  borderRadius: '18px',
                  background: '#F9FAFB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{item.image || item.image3D}</span>
                  <div>
                    <h5 style={{ fontSize: '14px', margin: 0, color: '#101828' }}>{item.name}</h5>
                    <div style={{ fontSize: '11px', color: '#667085' }}>
                      {item.unit} • {formatCurrencyVND(item.price)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#ffffff',
                      borderRadius: '999px',
                      border: '1px solid #D0D5DD',
                      padding: '2px 6px'
                    }}
                  >
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '13px', fontWeight: '700', minWidth: '18px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    style={{ background: 'none', border: 'none', color: '#98A2B3', cursor: 'pointer', padding: '4px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={{ borderTop: '1px solid #E4E7EC', paddingTop: '16px', marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '14px', color: '#475467', fontWeight: 600 }}>
                {lang === 'en' ? 'Subtotal' : 'Tạm tính'}
              </span>
              <span style={{ fontSize: '22px', fontWeight: '800', color: '#1FA855' }}>
                {formatCurrencyVND(cartTotal)}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedCheckout();
              }}
              className="clay-btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '15px',
                borderRadius: '18px'
              }}
            >
              <span>{lang === 'en' ? 'Select Pickup Slot' : 'Chọn khung giờ nhận hàng'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
