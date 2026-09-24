import React from 'react';
import { Store, QrCode } from 'lucide-react';

export default function FarmStall({ onOpenMap, nearbyMarketsBtnText }) {
  return (
    <div 
      className="tilt-inner"
      style={{
        flex: '1.1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '10px 20px'
      }}
    >
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '430px',
          height: '350px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}
      >
        <div 
          className="clay-card"
          style={{
            position: 'absolute',
            left: '-20px',
            top: '40px',
            zIndex: 6,
            background: '#ffffff',
            padding: '10px 12px',
            borderRadius: '14px',
            border: '1px dashed #1FA855',
            boxShadow: '0 8px 18px rgba(0,0,0,0.1)',
            width: '120px',
            transform: 'rotate(-4deg)'
          }}
        >
          <div style={{ fontSize: '9px', fontWeight: '800', color: '#166534', textAlign: 'center', borderBottom: '1px dashed #E4E7EC', paddingBottom: '4px' }}>
            PAY-AT-PICKUP
          </div>
          <div style={{ fontSize: '8px', color: '#667085', textAlign: 'center', margin: '2px 0 4px' }}>
            #ML-8924
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
            <svg width="42" height="42" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" rx="4" fill="#ffffff" />
              <rect x="10" y="10" width="30" height="30" rx="4" fill="#1FA855" />
              <rect x="18" y="18" width="14" height="14" rx="2" fill="#ffffff" />
              <rect x="60" y="10" width="30" height="30" rx="4" fill="#1FA855" />
              <rect x="68" y="18" width="14" height="14" rx="2" fill="#ffffff" />
              <rect x="10" y="60" width="30" height="30" rx="4" fill="#1FA855" />
              <rect x="18" y="68" width="14" height="14" rx="2" fill="#ffffff" />
              <rect x="52" y="52" width="16" height="16" rx="2" fill="#1FA855" />
              <rect x="74" y="60" width="16" height="30" rx="2" fill="#1FA855" />
              <rect x="52" y="74" width="16" height="16" rx="2" fill="#1FA855" />
            </svg>
          </div>
          <div style={{ fontSize: '8px', color: '#475467', lineHeight: 1.2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Produce:</span> <span>$21.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#1FA855' }}>
              <span>Total:</span> <span>$24.50</span>
            </div>
          </div>
        </div>

        <div 
          className="glow-pin"
          onClick={onOpenMap}
          title={nearbyMarketsBtnText}
          style={{
            position: 'absolute',
            top: '20px',
            right: '90px',
            zIndex: 8,
            cursor: 'pointer',
            transform: 'scale(1.05)'
          }}
        >
          <div 
            style={{
              background: 'radial-gradient(circle, #2dd56e 0%, #1FA855 80%)',
              width: '64px',
              height: '64px',
              borderRadius: '50% 50% 50% 4px',
              transform: 'rotate(-45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(31, 168, 85, 0.5), inset 0 2px 6px #fff',
              border: '3px solid #ffffff'
            }}
          >
            <div style={{ transform: 'rotate(45deg)', color: '#ffffff' }}>
              <Store size={26} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div 
          style={{
            position: 'absolute',
            top: '15px',
            left: '75px',
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <svg width="190" height="230" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="skin" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFE0BD" />
                <stop offset="70%" stopColor="#F5C09B" />
                <stop offset="100%" stopColor="#DE9E74" />
              </radialGradient>
              <radialGradient id="capGreen" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#3ddc84" />
                <stop offset="60%" stopColor="#1FA855" />
                <stop offset="100%" stopColor="#136934" />
              </radialGradient>
              <linearGradient id="apronGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#25a85c" />
                <stop offset="100%" stopColor="#146034" />
              </linearGradient>
              <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
              <filter id="clayShadow" x="-10%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#0d3c22" floodOpacity="0.25" />
              </filter>
            </defs>

            <g filter="url(#clayShadow)">
              <path d="M50 140 C40 160 50 190 70 190 C80 170 75 145 65 140 Z" fill="url(#shirtGrad)" />
              <path d="M150 140 C160 160 150 190 130 190 C120 170 125 145 135 140 Z" fill="url(#shirtGrad)" />
              
              <ellipse cx="65" cy="180" rx="14" ry="12" fill="url(#skin)" />
              <ellipse cx="135" cy="180" rx="14" ry="12" fill="url(#skin)" />

              <rect x="68" y="132" width="64" height="75" rx="16" fill="url(#shirtGrad)" />
              <path d="M74 140 L126 140 L130 205 L70 205 Z" fill="url(#apronGrad)" />
              <path d="M82 118 L88 140 M118 118 L112 140" stroke="#166534" strokeWidth="6" strokeLinecap="round" />
              <rect x="85" y="165" width="30" height="24" rx="6" fill="#185f34" opacity="0.6" />
              <circle cx="100" cy="177" r="4" fill="#3ddc84" />

              <rect x="88" y="112" width="24" height="25" rx="10" fill="url(#skin)" />
              <ellipse cx="100" cy="85" rx="42" ry="40" fill="url(#skin)" />
              <ellipse cx="58" cy="88" rx="8" ry="10" fill="url(#skin)" />
              <ellipse cx="142" cy="88" rx="8" ry="10" fill="url(#skin)" />

              <path d="M64 75 C60 55 80 45 100 45 C125 45 140 55 136 75 C130 65 115 60 100 60 C85 60 70 65 64 75 Z" fill="#5c3818" />
              <path d="M60 68 C62 38 95 32 100 32 C105 32 138 38 140 68 Z" fill="url(#capGreen)" />
              <path d="M52 68 C70 62 130 62 148 68 C145 76 130 78 100 78 C70 78 55 76 52 68 Z" fill="#1b8543" />

              <ellipse cx="88" cy="84" rx="4.5" ry="6" fill="#1c2430" />
              <circle cx="89" cy="82" r="1.5" fill="#ffffff" />
              <ellipse cx="112" cy="84" rx="4.5" ry="6" fill="#1c2430" />
              <circle cx="113" cy="82" r="1.5" fill="#ffffff" />

              <ellipse cx="80" cy="94" rx="6" ry="3.5" fill="#ff7a7a" opacity="0.45" />
              <ellipse cx="120" cy="94" rx="6" ry="3.5" fill="#ff7a7a" opacity="0.45" />
              <path d="M92 96 Q100 106 108 96" stroke="#5c3818" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        </div>

        <div 
          style={{
            width: '100%',
            zIndex: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div 
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              marginBottom: '-4px',
              zIndex: 2
            }}
          >
            <div 
              className="card-3d-tilt"
              style={{
                background: '#C1854D',
                border: '2px solid #8B5A2B',
                borderRadius: '8px',
                padding: '6px 10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.18)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '20px', lineHeight: 1 }}>🥕🥕</div>
              <div style={{ fontSize: '9px', fontWeight: '800', color: '#fff', textTransform: 'uppercase' }}>Carrot</div>
            </div>

            <div 
              className="card-3d-tilt"
              style={{
                background: '#C1854D',
                border: '2px solid #8B5A2B',
                borderRadius: '8px',
                padding: '6px 10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.18)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '20px', lineHeight: 1 }}>🍅🍅</div>
              <div style={{ fontSize: '9px', fontWeight: '800', color: '#fff', textTransform: 'uppercase' }}>Tomato</div>
            </div>

            <div 
              className="card-3d-tilt"
              style={{
                background: '#C1854D',
                border: '2px solid #8B5A2B',
                borderRadius: '8px',
                padding: '6px 10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.18)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '20px', lineHeight: 1 }}>🍊🍊</div>
              <div style={{ fontSize: '9px', fontWeight: '800', color: '#fff', textTransform: 'uppercase' }}>Orange</div>
            </div>
          </div>

          <div 
            style={{
              width: '100%',
              height: '24px',
              background: 'linear-gradient(180deg, #D49B6A 0%, #A26E3F 100%)',
              borderRadius: '8px',
              boxShadow: '0 6px 12px rgba(0,0,0,0.22), inset 0 2px 3px rgba(255,255,255,0.4)',
              border: '2px solid #805327'
            }}
          />

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <div 
              style={{
                background: '#BA7A44',
                padding: '4px 12px',
                borderRadius: '8px',
                border: '2px solid #73451F',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '18px' }}>🥬</span>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#fff' }}>Romaine</span>
            </div>
            <div 
              style={{
                background: '#BA7A44',
                padding: '4px 12px',
                borderRadius: '8px',
                border: '2px solid #73451F',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '18px' }}>🍈</span>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#fff' }}>Melon</span>
            </div>
            <div 
              style={{
                background: '#BA7A44',
                padding: '4px 12px',
                borderRadius: '8px',
                border: '2px solid #73451F',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ fontSize: '18px' }}>🍄</span>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#fff' }}>Mushroom</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
