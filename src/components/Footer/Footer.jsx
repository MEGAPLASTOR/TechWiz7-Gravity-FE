import React from 'react';
import { Sprout, Zap } from 'lucide-react';
import { TRANSLATIONS } from '@/constants/translations';

export default function Footer({ lang = 'en' }) {
  const t = TRANSLATIONS[lang];

  const safetyBadges = lang === 'en' ? [
    { title: 'VietGAP Certified', desc: '100% compliant with Vietnam Good Agricultural Practices', icon: '🌾' },
    { title: 'GlobalGAP Standard', desc: 'High-tech recirculation hydroponics & clean soil', icon: '🌱' },
    { title: 'Zero Gateway Fee', desc: 'Direct farmer settlement with no platform commission', icon: '💰' },
    { title: '04:00 AM Dawn Harvest', desc: 'Picked fresh within hours of your morning market slot', icon: '⏰' },
    { title: 'Traceable Origin QR', desc: 'Cryptographic batch ID tagged to specific farm lots', icon: '🔍' },
  ] : [
    { title: 'VietGAP Certified', desc: '100% đạt chuẩn an toàn thực phẩm Việt Nam', icon: '🌾' },
    { title: 'GlobalGAP Standard', desc: 'Nông nghiệp công nghệ cao hồi lưu', icon: '🌱' },
    { title: 'Zero Gateway Fee', desc: 'Thanh toán trực tiếp, không mất phí sàn', icon: '💰' },
    { title: 'Thu Hoạch Sau 04:00 AM', desc: 'Giao trong ngày, giữ trọn độ tươi giòn', icon: '⏰' },
    { title: 'Truy Xuất Nguồn Gốc', desc: 'Mã số vùng trồng định danh từng luống rau', icon: '🔍' },
  ];

  const liveTickers = lang === 'en' ? [
    '🟢 Fresh harvest pre-orders cutoff nightly at 21:00 for dawn collection',
    '🟢 100% farm-to-table traceability verified under VietGAP & GlobalGAP standards',
    '🟢 Direct farmer settlements with zero platform gateway fees',
    '🟢 Local farmers market hubs active with scheduled morning pickup slots',
    '🟢 Inspect produce freshness at the morning stall before paying at pickup'
  ] : [
    '🟢 Chốt đơn đặt trước nông sản vào 21:00 hàng đêm để nhà vườn thu hoạch sáng sớm',
    '🟢 Cam kết 100% nông sản sạch VietGAP, truy xuất nguồn gốc minh bạch',
    '🟢 Mô hình thanh toán tại quầy không qua trung gian, miễn 100% phí sàn',
    '🟢 Các phiên chợ nông sản địa phương mở ca nhận hàng đúng hẹn',
    '🟢 Khách hàng kiểm tra độ tươi giòn tận mắt rồi mới thanh toán tại quầy'
  ];

  return (
    <footer style={{ marginTop: 'auto', background: '#ffffff', borderTop: '1px solid #E4E7EC' }}>
      <div 
        style={{
          background: '#14532D',
          color: '#EAF4EC',
          padding: '10px 0',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          fontSize: '12px',
          fontWeight: '600'
        }}
      >
        <div 
          style={{
            background: '#1FA855',
            color: '#fff',
            padding: '4px 14px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: '800',
            marginLeft: '20px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Zap size={13} />
          {lang === 'en' ? 'FARM UPDATES' : 'BẢN TIN NÔNG TRẠI'}
        </div>

        <div 
          style={{
            display: 'flex',
            gap: '40px',
            whiteSpace: 'nowrap',
            animation: 'tickerMove 35s linear infinite',
            paddingLeft: '20px'
          }}
        >
          {liveTickers.concat(liveTickers).map((item, idx) => (
            <span key={idx} style={{ opacity: 0.9 }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: '36px 20px', borderBottom: '1px solid #F2F4F7' }}>
        <div className="container">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '20px'
            }}
          >
            {safetyBadges.map((badge, idx) => (
              <div 
                key={idx}
                className="clay-card card-3d-tilt"
                style={{
                  padding: '16px 18px',
                  borderRadius: '20px',
                  background: '#F9FCFA',
                  border: '1px solid rgba(31, 168, 85, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <span style={{ fontSize: '28px', lineHeight: 1 }}>{badge.icon}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#101828' }}>
                    {badge.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#667085', marginTop: '2px', lineHeight: 1.3 }}>
                    {badge.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '32px 20px 48px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div 
                className="spin-3d-coin"
                style={{
                  background: '#1FA855',
                  color: '#ffffff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Sprout size={18} />
              </div>
              <span style={{ fontFamily: 'var(--font-header)', fontSize: '20px', fontWeight: '800', color: '#101828' }}>
                Market<span style={{ color: '#1FA855' }}>Link</span>
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#667085', marginTop: '6px', maxWidth: '440px' }}>
              {lang === 'en'
                ? 'Decentralized local agricultural marketplace connecting certified farms directly with urban consumers across the Mekong Delta.'
                : 'Nền tảng thương mại nông sản số địa phương, hỗ trợ liên kết nông hộ canh tác sạch với người tiêu dùng văn minh tại các đô thị miền Tây.'}
            </p>
          </div>

          <div style={{ fontSize: '13px', color: '#667085', textAlign: 'right' }}>
            <div style={{ fontWeight: '700', color: '#101828', marginBottom: '4px' }}>
              {t.copyright}
            </div>
            <div>MarketLink O2O Agriculture Platform</div>
            <div style={{ fontSize: '11px', color: '#98A2B3', marginTop: '4px' }}>
              {t.designBy}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
