import React from 'react';
import { 
  X, 
  MapPin, 
  Check, 
  Clock, 
  Navigation, 
  Users
} from 'lucide-react';
export default function MarketMapModal({ isOpen, onClose, selectedMarket, onSelectMarket, lang = 'en', markets = [] }) {
  if (!isOpen) return null;

  const marketsList = Array.isArray(markets) ? markets : [];


  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(10, 35, 20, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        className="clay-card card-3d-tilt"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          background: '#ffffff',
          borderRadius: '32px',
          padding: '28px 32px',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div 
                style={{
                  background: '#EAF4EC',
                  color: '#1FA855',
                  padding: '8px',
                  borderRadius: '12px'
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '22px', margin: 0, color: '#101828' }}>
                  {lang === 'en' ? 'Select Nearby Pickup Market (GPS Hubs)' : 'Chọn Điểm Chợ Nhận Hàng (GPS Pickup Hubs)'}
                </h3>
                <p style={{ fontSize: '13px', color: '#667085', margin: 0 }}>
                  {lang === 'en' 
                    ? 'Harvests are aggregated at your nearest neighborhood market stall counter' 
                    : 'Nông sản sẽ được gom về điểm quầy nông sản địa phương gần nhất cho bạn'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#F2F4F7',
              border: 'none',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#667085'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div 
          style={{
            height: '180px',
            borderRadius: '20px',
            background: 'linear-gradient(145deg, #d8eee0 0%, #c6e6d1 100%)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '24px',
            border: '2px solid rgba(31, 168, 85, 0.25)',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.06)'
          }}
        >
          <svg style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.5 }}>
            <path d="M-50,60 Q150,140 400,70 T850,110" stroke="#7ac5e8" strokeWidth="28" fill="none" />
          </svg>

          <div style={{ position: 'absolute', top: '30px', left: 0, right: 0, height: '6px', background: '#ffffff', opacity: 0.8 }} />
          <div style={{ position: 'absolute', top: '100px', left: 0, right: 0, height: '8px', background: '#ffffff', opacity: 0.8 }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '200px', width: '6px', background: '#ffffff', opacity: 0.8 }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '520px', width: '7px', background: '#ffffff', opacity: 0.8 }} />

          {marketsList.map((market, idx) => {
            const isSelected = selectedMarket?.id === market.id;
            const positions = [
              { top: '38%', left: '26%' },
              { top: '65%', left: '55%' },
              { top: '25%', left: '78%' },
              { top: '22%', left: '40%' },
            ];
            const pos = positions[idx] || { top: '50%', left: '50%' };

            return (
              <div
                key={market.id}
                onClick={() => onSelectMarket(market)}
                style={{
                  position: 'absolute',
                  ...pos,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: isSelected ? 10 : 5,
                  textAlign: 'center'
                }}
              >
                <div 
                  style={{
                    background: isSelected ? '#1FA855' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#1FA855',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: '800',
                    boxShadow: isSelected ? '0 0 16px rgba(31, 168, 85, 0.7)' : '0 4px 10px rgba(0,0,0,0.15)',
                    border: isSelected ? '2px solid #ffffff' : '2px solid #1FA855',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <MapPin size={13} />
                  <span>{market.shortName}</span>
                </div>
              </div>
            );
          })}

          <div 
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '14px',
              background: 'rgba(255,255,255,0.85)',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '11px',
              color: '#344054',
              fontWeight: 600
            }}
          >
            📍 {lang === 'en' ? 'Digital Farm Geospatial Map • Mekong Delta Hubs' : 'Bản đồ số hóa vùng nông sản TP. Cần Thơ & ĐBSCL'}
          </div>
        </div>

        {marketsList.length === 0 ? (
          <div style={{ padding: '36px 20px', textAlign: 'center', background: '#F9FAFB', borderRadius: '18px', border: '1px dashed #D0D5DD' }}>
            <MapPin size={36} color="#98A2B3" style={{ margin: '0 auto 10px' }} />
            <div style={{ fontWeight: 700, color: '#344054', fontSize: '15px' }}>
              {lang === 'en' ? 'No market locations in database yet' : 'Chưa có điểm chợ nào trong cơ sở dữ liệu'}
            </div>
            <p style={{ fontSize: '13px', color: '#667085', margin: '6px 0 0' }}>
              {lang === 'en' ? 'Market hubs created in the Admin Portal will appear here live.' : 'Quản trị viên có thể tạo mới các điểm chợ trong Cổng Quản Trị để hiển thị trực tiếp tại đây.'}
            </p>
          </div>
        ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
          {marketsList.map((market) => {
            const isSelected = selectedMarket?.id === market.id;
            return (
              <div
                key={market.id}
                onClick={() => onSelectMarket(market)}
                className="clay-card card-3d-tilt"
                style={{
                  padding: '18px 20px',
                  borderRadius: '24px',
                  background: isSelected ? '#F0FDF4' : '#ffffff',
                  border: isSelected ? '2px solid #1FA855' : '1px solid #E4E7EC',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: isSelected ? '0 8px 20px rgba(31, 168, 85, 0.16)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px', fontWeight: '800', color: '#101828' }}>
                        {market.name}
                      </span>
                      {market.isHubPrimary && (
                        <span 
                          style={{
                            fontSize: '10px',
                            background: '#1FA855',
                            color: '#fff',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            fontWeight: '700'
                          }}
                        >
                          {lang === 'en' ? 'Primary Hub' : 'Hub Chính'}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '12px', color: '#667085', margin: '4px 0 0' }}>
                      {market.address}
                    </p>
                  </div>

                  <div 
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: isSelected ? '#1FA855' : '#F2F4F7',
                      color: isSelected ? '#ffffff' : '#D0D5DD',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Check size={14} strokeWidth={3} />
                  </div>
                </div>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    fontSize: '12px',
                    color: '#344054',
                    background: 'rgba(255,255,255,0.7)',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Navigation size={13} color="#1FA855" />
                    <strong>{market.distance}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} color="#FF7A30" />
                    <span>{market.pickupHours}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={13} color="#2563EB" />
                    <span>{market.activeFarmers} {lang === 'en' ? 'farmers' : 'nông dân'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#667085' }}>
                  <span>📍 {market.stallNumber}</span>
                  <span style={{ color: '#1FA855', fontWeight: '700' }}>
                    {lang === 'en' ? `${market.availableSlots}/${market.totalSlots} slots available` : `Còn ${market.availableSlots}/${market.totalSlots} khung giờ`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        )}


        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <button 
            className="clay-btn-primary"
            onClick={onClose}
            style={{ padding: '12px 28px', fontSize: '15px' }}
          >
            {lang === 'en' ? 'Confirm This Market Hub' : 'Xác nhận điểm nhận hàng này'}
          </button>
        </div>
      </div>
    </div>
  );
}
