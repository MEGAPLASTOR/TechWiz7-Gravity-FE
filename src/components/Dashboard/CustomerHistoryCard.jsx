import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CustomerHistoryCard({ user, rbacData }) {
  return (
    <div 
      className="clay-card card-3d-tilt"
      style={{ padding: '28px', borderRadius: '28px', background: '#ffffff' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px', color: '#101828', margin: 0 }}>
          Customer Pre-Order History & Electronic Tickets
        </h3>
        <span style={{ fontSize: '13px', color: '#1FA855', fontWeight: '700' }}>
          ⭐ Tier: Eco Member (Verified Buyer)
        </span>
      </div>

      {rbacData?.message && (
        <div style={{
          background: '#F0FDF4',
          border: '1.5px solid #1FA855',
          borderRadius: '16px',
          padding: '14px 18px',
          marginBottom: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#166534',
          fontSize: '13px',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(31,168,85,0.08)',
        }}>
          <Sparkles size={18} color="#1FA855" style={{ flexShrink: 0 }} />
          <span>{rbacData.message}</span>
        </div>
      )}

      <div style={{ background: '#F8FCF9', padding: '18px', borderRadius: '16px', border: '1px solid rgba(31, 168, 85, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#101828' }}>
              {user?.fullName ? `Khách hàng: ${user.fullName} • Mã KH: #ML-${String(user.userId || 9).padStart(4, '0')}` : 'Đơn đặt trước gần nhất: #ML-8924'}
            </div>
            <div style={{ fontSize: '13px', color: '#667085', marginTop: '4px' }}>
              Điểm nhận hàng: Chợ Trung Tâm Cần Thơ • Bến Ninh Kiều (Slot 08:00 - 08:30 AM)
            </div>
            {user?.profileDetails?.defaultAddress && (
              <div style={{ fontSize: '12px', color: '#166534', marginTop: '3px', fontWeight: 600 }}>
                📍 Địa chỉ mặc định: {user.profileDetails.defaultAddress}
              </div>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ background: '#F0FDF4', color: '#15803d', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '700' }}>
              Sẵn sàng nhận hàng
            </span>
            <div style={{ fontSize: '11px', color: '#667085', marginTop: '4px' }}>
              Thanh toán tại quầy: 97.000đ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
