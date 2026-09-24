import React from 'react';
import { Banknote, MapPin, User, Phone } from 'lucide-react';

export default function CustomerForm({
  selectedMarket,
  onOpenMap,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  t
}) {
  return (
    <>
      <div 
        className="clay-card card-3d-tilt"
        style={{
          padding: '18px 22px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #F0FDF4 0%, #E8F8ED 100%)',
          border: '2px solid rgba(31, 168, 85, 0.35)',
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start'
        }}
      >
        <div 
          style={{
            background: '#1FA855',
            color: '#ffffff',
            padding: '10px',
            borderRadius: '14px',
            flexShrink: 0,
            boxShadow: '0 4px 10px rgba(31, 168, 85, 0.3)'
          }}
        >
          <Banknote size={24} />
        </div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#136934', marginBottom: '2px' }}>
            {t.zeroGatewayTitle}
          </div>
          <p style={{ fontSize: '13px', color: '#344054', lineHeight: 1.45, margin: 0 }}>
            {t.zeroGatewayDesc}
          </p>
        </div>
      </div>

      <div 
        className="clay-card"
        style={{
          padding: '18px 22px',
          borderRadius: '24px',
          background: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={20} color="#1FA855" />
            <div>
              <div style={{ fontSize: '11px', color: '#667085', fontWeight: 600 }}>{t.pickupLocation}</div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#101828' }}>
                {selectedMarket?.name}
              </div>
              <div style={{ fontSize: '12px', color: '#1FA855', fontWeight: 600 }}>
                {selectedMarket?.stallNumber}
              </div>
            </div>
          </div>
          <button
            onClick={onOpenMap}
            style={{
              border: 'none',
              background: '#F0FDF4',
              color: '#1FA855',
              padding: '8px 14px',
              borderRadius: '999px',
              fontWeight: '700',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {t.changeMarket || 'Change Hub'}
          </button>
        </div>
      </div>

      <div 
        className="clay-card"
        style={{
          padding: '22px',
          borderRadius: '24px',
          background: '#ffffff'
        }}
      >
        <h4 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 16px', color: '#101828' }}>
          {t.customerInfoTitle}
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#344054', marginBottom: '6px' }}>
              {t.fullName}
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', color: '#98A2B3' }} />
              <input 
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 36px',
                  borderRadius: '12px',
                  border: '1px solid #D0D5DD',
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: 'var(--font-data)'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#344054', marginBottom: '6px' }}>
              {t.phoneNumber}
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Phone size={16} style={{ position: 'absolute', left: '12px', color: '#98A2B3' }} />
              <input 
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 36px',
                  borderRadius: '12px',
                  border: '1px solid #D0D5DD',
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: 'var(--font-data)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
