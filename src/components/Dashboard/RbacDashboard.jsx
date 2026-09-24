import React, { useState, useEffect } from 'react';
import { useRbacData } from '@/hooks/useRbacData';
import { Users, ShieldCheck, Sparkles, Sprout, CheckCircle2, Clock } from 'lucide-react';
import { TRANSLATIONS } from '@/constants/translations';
import { useAuth } from '@/context/AuthContext';
import { getPendingKycList, reviewFarmerKyc } from '@/api/adminApi';
import FarmerMetrics from './FarmerMetrics';
import FarmerKycSection from './FarmerKycSection';
import KycReviewTable from './KycReviewTable';
import CustomerHistoryCard from './CustomerHistoryCard';
import CustomerFamilySection from './CustomerFamilySection';

export default function RbacDashboard({ currentRole, lang = 'en', isLoggedIn = false, onOpenLogin }) {
  const t = TRANSLATIONS[lang];
  const { user } = useAuth();
  const [kycList, setKycList] = useState([]);
  const [isLoadingKyc, setIsLoadingKyc] = useState(false);

  const { data: rbacData } = useRbacData(currentRole, isLoggedIn);

  const loadKyc = async () => {
    if (currentRole !== 'admin') return;
    setIsLoadingKyc(true);
    try {
      const res = await getPendingKycList();
      const list = Array.isArray(res) ? res : (Array.isArray(res?.data) ? res.data : []);
      setKycList(list);
    } catch {
      setKycList([]);
    } finally {
      setIsLoadingKyc(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && currentRole === 'admin') {
      loadKyc();
    }
  }, [isLoggedIn, currentRole]);

  const handleKycReview = async (farmerId, payload) => {
    try {
      await reviewFarmerKyc(farmerId, payload);
      loadKyc();
    } catch (err) {
      alert(err.message || 'Lỗi khi cập nhật hồ sơ KYC');
    }
  };

  return (
    <section id="dashboard-section" style={{ padding: '24px 20px 48px' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span 
                className="clay-pill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  background: '#EAF4EC',
                  color: '#1FA855',
                  fontSize: '12px',
                  fontWeight: '700'
                }}
              >
                <Users size={14} />
                {t.panel4Title}
              </span>
            </div>
            <h2 style={{ fontSize: '32px', color: '#101828', margin: 0 }}>
              {t.dashboardHeading}
            </h2>
            <p style={{ fontSize: '15px', color: '#475467', margin: '4px 0 0' }}>
              {isLoggedIn ? (
                <>
                  {t.dashboardRolePrefix}{' '}
                  <strong style={{ color: currentRole === 'farmer' ? '#FF7A30' : currentRole === 'admin' ? '#2563EB' : '#1FA855' }}>
                    {currentRole === 'farmer' 
                      ? `👨‍🌾 ${t.roleFarmer}` 
                      : currentRole === 'admin' 
                      ? `🛡️ ${t.roleAdmin}` 
                      : `🛒 ${t.roleCustomer}`}
                  </strong>
                </>
              ) : (
                lang === 'en'
                  ? 'Reserve fresh produce from verified local growers across the Mekong Delta'
                  : 'Nền tảng liên kết nông hộ canh tác sạch với người tiêu dùng miền Tây'
              )}
            </p>
          </div>
        </div>

        {/* Trạng thái tài khoản người dùng */}
        {!isLoggedIn ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                background: '#ffffff',
                border: '1.5px solid rgba(31,168,85,0.25)',
                borderRadius: '20px',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap',
                boxShadow: '0 4px 14px rgba(31,168,85,0.06)',
              }}
            >
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#101828', marginBottom: '4px' }}>
                  🌱 Chào mừng bạn đến với MarketLink
                </div>
                <div style={{ fontSize: '14px', color: '#475467', maxWidth: '640px', lineHeight: 1.5 }}>
                  Đăng nhập tài khoản để quản lý đơn đặt trước, nhận vé nhận hàng điện tử tại quầy chợ và nhận các ưu đãi nông sản sạch mới nhất.
                </div>
              </div>
              <button
                onClick={onOpenLogin}
                style={{
                  background: 'linear-gradient(135deg, #1FA855 0%, #166534 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '12px 26px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 14px rgba(31,168,85,0.25)',
                  transition: 'transform 0.15s',
                }}
              >
                Đăng nhập ngay →
              </button>
            </div>

            {/* Quality Standard Cards for Visitors */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div 
                className="clay-card card-3d-tilt"
                style={{ padding: '20px', borderRadius: '20px', background: '#ffffff' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ background: '#F0FDF4', color: '#1FA855', padding: '10px', borderRadius: '12px' }}>
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#101828' }}>100% Nông Hộ VietGAP</div>
                    <div style={{ fontSize: '12px', color: '#166534', fontWeight: 600 }}>Kiểm định nguồn gốc</div>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#667085', margin: 0, lineHeight: 1.5 }}>
                  Tất cả vườn rau, củ quả trên MarketLink đều được xác minh chứng nhận an toàn và vị trí vùng trồng thực tế.
                </p>
              </div>

              <div 
                className="clay-card card-3d-tilt"
                style={{ padding: '20px', borderRadius: '20px', background: '#ffffff' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ background: '#FFF4ED', color: '#FF7A30', padding: '10px', borderRadius: '12px' }}>
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#101828' }}>Pay-At-Pickup (0đ phí)</div>
                    <div style={{ fontSize: '12px', color: '#FF7A30', fontWeight: 600 }}>Thanh toán tại quầy</div>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#667085', margin: 0, lineHeight: 1.5 }}>
                  Kiểm tra tận mắt độ tươi ngon của nông sản tại điểm hẹn trước khi thanh toán trực tiếp cho nông dân.
                </p>
              </div>

              <div 
                className="clay-card card-3d-tilt"
                style={{ padding: '20px', borderRadius: '20px', background: '#ffffff' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ background: '#EFF8FF', color: '#2563EB', padding: '10px', borderRadius: '12px' }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#101828' }}>Thu Hoạch 04:00 AM</div>
                    <div style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600 }}>Tươi mới trong ngày</div>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: '#667085', margin: 0, lineHeight: 1.5 }}>
                  Đơn hàng chốt 21:00 đêm hôm trước để nhà vườn thu hái vào sáng sớm hôm sau và giao đúng slot của bạn.
                </p>
              </div>
            </div>
          </div>
        ) : user ? (
          <div
            style={{
              background: '#ffffff',
              border: '1.5px solid rgba(31,168,85,0.2)',
              borderRadius: '20px',
              padding: '18px 24px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              boxShadow: '0 4px 14px rgba(31,168,85,0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1FA855, #166534)',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(31,168,85,0.25)',
                  flexShrink: 0,
                }}
              >
                {user.fullName ? user.fullName.slice(0, 2).toUpperCase() : 'U'}
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#101828' }}>
                  Xin chào, {user.fullName}!
                </div>
                <div style={{ fontSize: '13px', color: '#667085', marginTop: '2px' }}>
                  {user.email} • Trạng thái: <strong style={{ color: '#1FA855' }}>Đang hoạt động ✓</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  background: '#EAF4EC',
                  color: '#166534',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                {currentRole === 'farmer' ? '👨‍🌾 NÔNG DÂN' : currentRole === 'admin' ? '🛡️ QUẢN TRỊ VIÊN' : '🛒 KHÁCH HÀNG'}
              </span>
            </div>
          </div>
        ) : null}

        {/* 1. FARMER VIEW */}
        {isLoggedIn && currentRole === 'farmer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {rbacData?.message && (
              <div style={{
                background: '#F0FDF4',
                border: '1.5px solid #1FA855',
                borderRadius: '16px',
                padding: '14px 18px',
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

            <FarmerMetrics t={t} user={user} rbacData={rbacData} />

            <FarmerKycSection />
          </div>
        )}

        {/* 2. ADMIN VIEW (Chỉ hiển thị khi đã đăng nhập với vai trò ADMIN thực tế) */}
        {isLoggedIn && currentRole === 'admin' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {rbacData?.message && (
              <div style={{
                background: '#EFF8FF',
                border: '1.5px solid #2563EB',
                borderRadius: '16px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#1E40AF',
                fontSize: '13px',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
              }}>
                <ShieldCheck size={18} color="#2563EB" style={{ flexShrink: 0 }} />
                <span>{rbacData.message}</span>
              </div>
            )}

            <KycReviewTable 
              kycList={kycList} 
              onKycReview={handleKycReview} 
              isLoading={isLoadingKyc}
              t={t} 
            />
          </div>
        )}

        {/* 3. CUSTOMER VIEW (Mặc định cho thành viên đăng nhập) */}
        {isLoggedIn && currentRole === 'customer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <CustomerHistoryCard user={user} rbacData={rbacData} />
            <CustomerFamilySection />
          </div>
        )}
      </div>
    </section>
  );
}
