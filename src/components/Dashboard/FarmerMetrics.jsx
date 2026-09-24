import React from 'react';
import { PackageCheck, TrendingUp, DollarSign, Clock, ShieldCheck } from 'lucide-react';

export default function FarmerMetrics({ t, user, rbacData }) {
  const stallName = user?.profileDetails?.stallName || 'Trang trại sinh thái';
  const farmAddress = user?.profileDetails?.farmAddress || 'Cần Thơ & ĐBSCL';
  const isApproved = user?.profileDetails?.isApproved ?? false;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
      <div 
        className="clay-card card-3d-tilt"
        style={{ padding: '20px', borderRadius: '24px', background: '#ffffff' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#667085', fontWeight: 600 }}>{t.totalOrders}</span>
          <div style={{ background: '#F0FDF4', color: '#1FA855', padding: '8px', borderRadius: '12px' }}>
            <PackageCheck size={20} />
          </div>
        </div>
        <div style={{ fontSize: '28px', fontWeight: '800', color: '#101828', marginTop: '8px' }}>
          {user?.userId ? `#ML-${String(user.userId).padStart(3, '0')}` : '142 orders'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#1FA855', marginTop: '4px', fontWeight: 600 }}>
          <TrendingUp size={14} /> Mã nông dân: #{user?.userId || '05'}
        </div>
      </div>

      <div 
        className="clay-card card-3d-tilt"
        style={{ padding: '20px', borderRadius: '24px', background: '#ffffff' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#667085', fontWeight: 600 }}>{t.expectedRevenue}</span>
          <div style={{ background: '#FFF4ED', color: '#FF7A30', padding: '8px', borderRadius: '12px' }}>
            <DollarSign size={20} />
          </div>
        </div>
        <div style={{ fontSize: '28px', fontWeight: '800', color: '#FF7A30', marginTop: '8px' }}>
          Zero Gateway
        </div>
        <div style={{ fontSize: '12px', color: '#667085', marginTop: '4px', fontWeight: 500 }}>
          100% Thu tiền mặt tại quầy nhận
        </div>
      </div>

      <div 
        className="clay-card card-3d-tilt"
        style={{ padding: '20px', borderRadius: '24px', background: '#ffffff' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#667085', fontWeight: 600 }}>Sạp liên kết</span>
          <div style={{ background: '#EFF8FF', color: '#2563EB', padding: '8px', borderRadius: '12px' }}>
            <Clock size={20} />
          </div>
        </div>
        <div style={{ fontSize: '20px', fontWeight: '800', color: '#101828', marginTop: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {stallName}
        </div>
        <div style={{ fontSize: '12px', color: '#2563EB', marginTop: '4px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          📍 {farmAddress}
        </div>
      </div>

      <div 
        className="clay-card card-3d-tilt"
        style={{ padding: '20px', borderRadius: '24px', background: '#ffffff' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#667085', fontWeight: 600 }}>{t.farmerKycStatus}</span>
          <div style={{ background: isApproved ? '#F0FDF4' : '#FFF9F5', color: isApproved ? '#1FA855' : '#FF7A30', padding: '8px', borderRadius: '12px' }}>
            <ShieldCheck size={20} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
          <span style={{ fontSize: '18px', fontWeight: '800', color: isApproved ? '#1FA855' : '#FF7A30' }}>
            {isApproved ? 'Đã duyệt' : 'Chờ xét duyệt'}
          </span>
          <span style={{ background: isApproved ? '#1FA855' : '#FF7A30', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '999px', fontWeight: 700 }}>
            {isApproved ? 'Verified' : 'Pending'}
          </span>
        </div>
        <div style={{ fontSize: '12px', color: '#667085', marginTop: '4px' }}>
          {user?.fullName || 'Hồ sơ chủ nông trại'}
        </div>
      </div>
    </div>
  );
}
