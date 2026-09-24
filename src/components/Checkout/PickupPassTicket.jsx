import React from 'react';
import { ShieldCheck, CheckCircle, Download, Share2 } from 'lucide-react';
import { formatCurrencyVND } from '@/utils/formatters';

export default function PickupPassTicket({
  confirmedOrder,
  selectedMarket,
  selectedSlot,
  customerName,
  customerPhone,
  cartTotal,
  lang = 'en',
  t
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div 
        className="clay-card card-3d-tilt hologram-shimmer"
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#ffffff',
          borderRadius: '32px',
          boxShadow: '0 24px 50px rgba(31, 168, 85, 0.22), inset 0 2px 4px #fff',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(31, 168, 85, 0.25)'
        }}
      >
        <div 
          style={{
            background: 'linear-gradient(135deg, #1FA855 0%, #166534 100%)',
            padding: '20px 24px',
            color: '#ffffff',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: '700', marginBottom: '8px' }}>
            <ShieldCheck size={14} />
            <span>{t.ticketHeaderBadge}</span>
          </div>
          <h3 style={{ fontSize: '24px', margin: 0, fontWeight: '800', letterSpacing: '0.5px' }}>
            {confirmedOrder?.orderCode || '#ML-PREVIEW'}
          </h3>
          <p style={{ fontSize: '12px', opacity: 0.9, margin: '4px 0 0' }}>
            {t.ticketSubtitle}
          </p>

          <div 
            style={{
              position: 'absolute',
              bottom: '-12px',
              left: '-12px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'var(--pastel-base)',
              boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.1)'
            }} 
          />
          <div 
            style={{
              position: 'absolute',
              bottom: '-12px',
              right: '-12px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'var(--pastel-base)',
              boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.1)'
            }} 
          />
        </div>

        <div className="tilt-inner" style={{ padding: '24px 24px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <span 
              style={{
                background: '#F0FDF4',
                color: '#15803d',
                border: '1px solid #bbf7d0',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: '800',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <CheckCircle size={13} color="#1FA855" />
              {t.ticketStatusConfirmed}
            </span>
          </div>

          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              background: '#F8FCF9',
              borderRadius: '20px',
              border: '2px solid rgba(31, 168, 85, 0.25)',
              marginBottom: '18px',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.02)'
            }}
          >
            <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" rx="8" fill="#ffffff" />
              
              <rect x="8" y="8" width="28" height="28" rx="4" fill="#1FA855" />
              <rect x="14" y="14" width="16" height="16" rx="2" fill="#ffffff" />
              <rect x="18" y="18" width="8" height="8" rx="1" fill="#1FA855" />

              <rect x="64" y="8" width="28" height="28" rx="4" fill="#1FA855" />
              <rect x="70" y="14" width="16" height="16" rx="2" fill="#ffffff" />
              <rect x="74" y="18" width="8" height="8" rx="1" fill="#1FA855" />

              <rect x="8" y="64" width="28" height="28" rx="4" fill="#1FA855" />
              <rect x="14" y="70" width="16" height="16" rx="2" fill="#ffffff" />
              <rect x="18" y="74" width="8" height="8" rx="1" fill="#1FA855" />

              <rect x="42" y="12" width="6" height="16" fill="#1FA855" />
              <rect x="52" y="8" width="6" height="8" fill="#1FA855" />
              <rect x="42" y="32" width="16" height="6" fill="#1FA855" />
              <rect x="12" y="42" width="16" height="6" fill="#1FA855" />
              <rect x="32" y="42" width="6" height="16" fill="#1FA855" />
              <rect x="44" y="44" width="12" height="12" rx="2" fill="#1FA855" />
              <rect x="64" y="42" width="24" height="6" fill="#1FA855" />
              <rect x="82" y="52" width="6" height="16" fill="#1FA855" />
              <rect x="64" y="64" width="8" height="8" fill="#1FA855" />
              <rect x="76" y="64" width="12" height="6" fill="#1FA855" />
              <rect x="64" y="78" width="6" height="12" fill="#1FA855" />
              <rect x="76" y="76" width="14" height="14" rx="2" fill="#1FA855" />
              <rect x="44" y="64" width="6" height="24" fill="#1FA855" />
              <rect x="54" y="74" width="6" height="14" fill="#1FA855" />
            </svg>

            <span style={{ fontSize: '10px', color: '#667085', marginTop: '10px', textAlign: 'center', maxWidth: '240px' }}>
              {t.ticketScanNote}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#667085' }}>{t.ticketCustomer}:</span>
              <strong style={{ color: '#101828' }}>{confirmedOrder?.customerName || customerName}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#667085' }}>{t.ticketPhone}:</span>
              <span style={{ color: '#344054', fontWeight: '600' }}>{confirmedOrder?.customerPhone || customerPhone}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#667085' }}>{t.ticketHub}:</span>
              <span style={{ color: '#344054', fontWeight: '600' }}>
                {confirmedOrder?.market?.shortName || selectedMarket?.shortName}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#667085' }}>{t.ticketSlot}:</span>
              <strong style={{ color: '#1FA855' }}>
                {confirmedOrder?.slot?.label || selectedSlot?.label}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#667085' }}>{t.ticketStall}:</span>
              <strong style={{ color: '#101828' }}>
                {confirmedOrder?.market?.stallNumber || selectedMarket?.stallNumber}
              </strong>
            </div>

            <div style={{ height: '1px', background: '#E4E7EC', margin: '4px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#101828' }}>
                {t.ticketTotal}:
              </span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#1FA855' }}>
                {formatCurrencyVND(confirmedOrder?.total || cartTotal)}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={() => alert(lang === 'en' ? 'Downloaded Pickup Pass #ML-8924 to your device!' : 'Đã tải phiếu hẹn #ML-8924 về thiết bị!')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px',
                borderRadius: '12px',
                border: '1px solid #D0D5DD',
                background: '#ffffff',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                color: '#344054'
              }}
            >
              <Download size={14} />
              <span>{t.ticketSaveImg}</span>
            </button>

            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(confirmedOrder?.orderCode || '#ML-8924')}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px',
                borderRadius: '12px',
                border: '1px solid rgba(31, 168, 85, 0.4)',
                background: '#F0FDF4',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                color: '#15803d'
              }}
            >
              <Share2 size={14} />
              <span>{t.ticketCopyCode}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
