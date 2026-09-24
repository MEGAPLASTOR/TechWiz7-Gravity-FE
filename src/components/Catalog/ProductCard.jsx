import React from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  ShoppingBag, 
  Check, 
  Plus,
  Store,
  Phone
} from 'lucide-react';
import { formatCurrencyVND } from '@/utils/formatters';

export default function ProductCard({ 
  product, 
  inCartQty = 0, 
  isJustAdded = false, 
  onAdd, 
  t 
}) {
  const hasImage = typeof (product.image || product.avatarUrl) === 'string' && 
    (product.image || product.avatarUrl).match(/^(http|\/)/);

  return (
    <div
      className="clay-card card-3d-tilt"
      style={{
        padding: '20px',
        borderRadius: '28px',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span 
          style={{
            fontSize: '11px',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '999px',
            background: 'rgba(31, 168, 85, 0.12)',
            color: '#15803d',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <ShieldCheck size={13} color="#1FA855" />
          {product.badge || 'VietGAP'}
        </span>

        <span 
          style={{
            fontSize: '11px',
            fontWeight: '700',
            padding: '4px 8px',
            borderRadius: '999px',
            background: '#F0FDF4',
            color: '#166534',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1FA855' }} />
          {product.stallNumber || 'Sạp trực tiếp'}
        </span>
      </div>

      <div 
        className="tilt-inner"
        style={{
          height: '140px',
          borderRadius: '20px',
          background: 'linear-gradient(145deg, #f8fdf9 0%, #edf7f0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.03)',
          border: '1px solid rgba(31, 168, 85, 0.15)',
          marginBottom: '16px',
          overflow: 'hidden'
        }}
      >
        {hasImage ? (
          <img 
            src={product.image || product.avatarUrl} 
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div 
            style={{
              fontSize: '64px',
              lineHeight: 1,
              filter: 'drop-shadow(0 12px 14px rgba(0,0,0,0.18))',
              transition: 'transform 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            🏡
          </div>
        )}

        <div 
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '10px',
            fontSize: '11px',
            color: '#166534',
            fontWeight: 700,
            background: 'rgba(255,255,255,0.92)',
            padding: '2px 8px',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
          }}
        >
          {product.unit || product.stallNumber || 'Tại quầy'}
        </div>
      </div>

      <div>
        <h3 
          style={{
            fontSize: '17px',
            fontWeight: '800',
            color: '#101828',
            marginBottom: '4px',
            lineHeight: 1.3
          }}
        >
          {product.name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#667085', marginBottom: '8px' }}>
          <span>👨‍🌾 {product.farmer}</span>
          <span>•</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '170px' }}>
            {product.farmLocation}
          </span>
        </div>

        <p style={{ fontSize: '12px', color: '#475467', lineHeight: 1.4, marginBottom: '14px', minHeight: '34px' }}>
          {product.description}
        </p>

        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11px',
            color: '#15803d',
            background: '#F0FDF4',
            padding: '5px 10px',
            borderRadius: '10px',
            marginBottom: '14px'
          }}
        >
          <Clock size={12} color="#1FA855" />
          <span>{product.harvestTime || 'Thu hoạch 04:30 AM • Giao tại quầy'}</span>
        </div>

        {/* Trạng thái sạp & Thông tin liên hệ thực tế */}
        <div style={{ marginBottom: '16px' }}>
          <div 
            style={{
              padding: '8px 12px',
              borderRadius: '12px',
              background: '#F8FCF9',
              border: '1px solid #E2F3E7',
              fontSize: '11px',
              color: '#475467',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={12} color="#1FA855" /> SĐT nhà vườn:
            </span>
            <strong style={{ color: '#101828' }}>{product.phoneNumber || 'Tại sạp chợ'}</strong>
          </div>
        </div>
      </div>

      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid #F2F4F7'
        }}
      >
        <div>
          <div style={{ fontSize: '10px', color: '#667085', fontWeight: 600 }}>Thanh toán</div>
          <div 
            style={{
              fontSize: '14px',
              fontWeight: '800',
              color: '#1FA855',
              fontFamily: 'var(--font-header)'
            }}
          >
            {product.price > 0 ? formatCurrencyVND(product.price) : 'Tại quầy (Zero Fee)'}
          </div>
        </div>

        <button
          onClick={() => onAdd(product)}
          className="clay-btn-primary"
          style={{
            padding: '10px 18px',
            fontSize: '13px',
            borderRadius: '16px',
            background: isJustAdded ? '#059669' : undefined
          }}
        >
          {isJustAdded ? (
            <>
              <Check size={16} strokeWidth={3} />
              <span>Đã thêm sạp</span>
            </>
          ) : inCartQty > 0 ? (
            <>
              <Plus size={15} />
              <span>Đã giữ chỗ ({inCartQty})</span>
            </>
          ) : (
            <>
              <ShoppingBag size={15} />
              <span>Đặt chỗ tại sạp</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
