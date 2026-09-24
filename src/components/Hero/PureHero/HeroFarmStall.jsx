import React from 'react';
import GpsPin from './GpsPin';
import Crate from './Crate';

export default function HeroFarmStall({ onOpenMap, onNavigateSection }) {
  return (
    <div
      style={{
        flex: '1.3',
        position: 'relative',
        minHeight: 390,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 6,
          top: 22,
          zIndex: 15,
          width: 132,
          background: '#fff',
          boxShadow: '0 14px 36px rgba(0,0,0,0.14)',
          padding: '12px 10px',
          borderRadius: 4,
          border: '1px solid #E4E7EC',
          clipPath:
            'polygon(0% 4px,5% 0%,10% 4px,15% 0%,20% 4px,25% 0%,30% 4px,35% 0%,40% 4px,45% 0%,50% 4px,55% 0%,60% 4px,65% 0%,70% 4px,75% 0%,80% 4px,85% 0%,90% 4px,95% 0%,100% 4px,100% calc(100% - 4px),95% 100%,90% calc(100% - 4px),85% 100%,80% calc(100% - 4px),75% 100%,70% calc(100% - 4px),65% 100%,60% calc(100% - 4px),55% 100%,50% calc(100% - 4px),45% 100%,40% calc(100% - 4px),35% 100%,30% calc(100% - 4px),25% 100%,20% calc(100% - 4px),15% 100%,10% calc(100% - 4px),5% 100%,0% calc(100% - 4px))',
          cursor: 'pointer',
        }}
        onClick={() => onNavigateSection && onNavigateSection('checkout')}
      >
        <div style={{ textAlign: 'center', borderBottom: '1px dashed #D0D5DD', paddingBottom: 6, marginBottom: 6 }}>
          <div style={{ fontSize: 8, fontWeight: 800, color: '#156534', letterSpacing: '0.6px' }}>PAY-AT-PICKUP</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#101828' }}>#ML-8924</div>
        </div>
        <div style={{ fontSize: 9, color: '#475467', lineHeight: 1.55 }}>
          {[['Vegetables', '$3.00'], ['Citrus box', '$3.50'], ['Mushrooms', '$5.00']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{k}</span><strong>{v}</strong>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: 3, marginTop: 3 }}>
            <strong style={{ color: '#101828' }}>Total</strong>
            <strong style={{ color: '#1FA855' }}>$24.50</strong>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '7px 0 4px' }}>
          <svg width="50" height="50" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" fill="#fff" />
            <rect x="2" y="2" width="12" height="12" stroke="#101828" strokeWidth="2" />
            <rect x="6" y="6" width="4" height="4" fill="#101828" />
            <rect x="26" y="2" width="12" height="12" stroke="#101828" strokeWidth="2" />
            <rect x="30" y="6" width="4" height="4" fill="#101828" />
            <rect x="2" y="26" width="12" height="12" stroke="#101828" strokeWidth="2" />
            <rect x="6" y="30" width="4" height="4" fill="#101828" />
            <rect x="18" y="4" width="4" height="4" fill="#101828" />
            <rect x="18" y="18" width="8" height="8" fill="#1FA855" />
            <rect x="30" y="22" width="4" height="4" fill="#101828" />
            <rect x="20" y="30" width="4" height="4" fill="#101828" />
            <rect x="26" y="26" width="4" height="4" fill="#101828" />
            <rect x="34" y="30" width="4" height="4" fill="#101828" />
          </svg>
        </div>
        <div style={{ display: 'flex', gap: 2, height: 12, justifyContent: 'center' }}>
          {[2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1].map((w, i) => (
            <div key={i} style={{ width: w, background: '#101828', height: '100%' }} />
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', top: 16, right: 74, zIndex: 16 }}>
        <GpsPin onClick={onOpenMap} />
      </div>

      <div style={{ position: 'absolute', top: 18, left: 110, zIndex: 10 }}>
        <svg width="205" height="250" viewBox="0 0 205 250" fill="none">
          <defs>
            <radialGradient id="sk" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#FFE4C6" />
              <stop offset="65%" stopColor="#F5C09B" />
              <stop offset="100%" stopColor="#DE9E74" />
            </radialGradient>
            <radialGradient id="cp" cx="30%" cy="28%" r="70%">
              <stop offset="0%" stopColor="#4de897" />
              <stop offset="55%" stopColor="#1FA855" />
              <stop offset="100%" stopColor="#0f6032" />
            </radialGradient>
            <linearGradient id="ap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#28bc63" />
              <stop offset="100%" stopColor="#135f34" />
            </linearGradient>
            <linearGradient id="sh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#DDE6E8" />
            </linearGradient>
            <filter id="sfsh" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#00000025" />
            </filter>
          </defs>
          <g filter="url(#sfsh)">
            <path d="M50 144 C38 165 48 196 70 196 L72 172 L66 142 Z" fill="url(#sh)" />
            <path d="M155 144 C167 165 157 196 134 196 L132 172 L138 142 Z" fill="url(#sh)" />
            <ellipse cx="67" cy="188" rx="15" ry="12" fill="url(#sk)" />
            <ellipse cx="138" cy="188" rx="15" ry="12" fill="url(#sk)" />
            <rect x="68" y="133" width="68" height="78" rx="18" fill="url(#sh)" />
            <path d="M76 142 L128 142 L132 210 L72 210 Z" fill="url(#ap)" />
            <rect x="88" y="172" width="28" height="22" rx="7" fill="#10522c" opacity="0.5" />
            <circle cx="102" cy="183" r="4" fill="#3ddc84" />
            <rect x="89" y="116" width="26" height="22" rx="10" fill="url(#sk)" />
            <ellipse cx="102" cy="87" rx="44" ry="42" fill="url(#sk)" />
            <ellipse cx="58" cy="90" rx="9" ry="11" fill="url(#sk)" />
            <ellipse cx="146" cy="90" rx="9" ry="11" fill="url(#sk)" />
            <path d="M63 76 C59 54 82 44 102 44 C126 44 143 54 141 76 C134 66 118 60 102 60 C86 60 70 66 63 76 Z" fill="#5c3818" />
            <path d="M60 70 C62 38 96 30 102 30 C108 30 142 38 144 70 Z" fill="url(#cp)" />
            <path d="M51 70 C68 64 136 64 153 70 C150 79 134 82 102 82 C70 82 54 79 51 70 Z" fill="#1a8040" />
            <circle cx="102" cy="48" r="5" fill="#fff" opacity="0.38" />
            <ellipse cx="89" cy="86" rx="4.5" ry="6" fill="#1c2430" />
            <circle cx="90.5" cy="83.5" r="1.6" fill="#fff" />
            <ellipse cx="115" cy="86" rx="4.5" ry="6" fill="#1c2430" />
            <circle cx="116.5" cy="83.5" r="1.6" fill="#fff" />
            <ellipse cx="80" cy="97" rx="6" ry="3.5" fill="#ffaaa0" opacity="0.5" />
            <ellipse cx="124" cy="97" rx="6" ry="3.5" fill="#ffaaa0" opacity="0.5" />
            <path d="M94 99 Q102 110 110 99" stroke="#5c3818" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: 460,
          zIndex: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: 10, marginBottom: 2, zIndex: 2 }}>
          <Crate emoji="🥕🥕" count={5} />
          <Crate emoji="🍅🍅" count={2} />
          <Crate emoji="🍊🍊" count={5} />
        </div>

        <div
          style={{
            width: '105%',
            height: 24,
            background: 'linear-gradient(180deg, #D9A06A 0%, #B37A3C 100%)',
            borderRadius: 9,
            boxShadow: '0 8px 18px rgba(0,0,0,0.25), inset 0 3px 4px rgba(255,255,255,0.4)',
            border: '2.5px solid #7a4d1e',
            position: 'relative',
          }}
        >
          {[30, 55, 78].map((p) => (
            <div key={p} style={{ position: 'absolute', top: 0, bottom: 0, left: `${p}%`, width: 1, background: 'rgba(100,50,0,0.18)' }} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '98%', padding: '0 16px' }}>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 14,
                height: 56,
                background: 'linear-gradient(180deg, #B37A3C 0%, #7a4d1e 100%)',
                borderRadius: '4px 4px 0 0',
                boxShadow: '2px 4px 8px rgba(0,0,0,0.2)',
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: -6, paddingBottom: 4 }}>
          <Crate emoji="🌿" count={2} size="sm" />
          <Crate emoji="🍅" count={10} size="sm" />
          <Crate emoji="🥬" count={3} size="sm" />
          <Crate emoji="🍄" size="sm" />
        </div>

        <div
          style={{
            width: '110%',
            height: 14,
            background: 'linear-gradient(180deg, #c8906a 0%, #9c6230 100%)',
            borderRadius: '0 0 6px 6px',
            boxShadow: '0 6px 14px rgba(0,0,0,0.2)',
            border: '2px solid #7a4d1e',
            borderTop: 'none',
          }}
        />
      </div>
    </div>
  );
}
