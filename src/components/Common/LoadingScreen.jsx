import React, { useState, useEffect } from 'react';
import { Sprout, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export default function LoadingScreen({ onComplete, duration = 1800 }) {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Initializing MarketLink Platform...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStatusText('Syncing Can Tho & Mekong Delta GPS Hubs...');
    }, 450);

    const timer2 = setTimeout(() => {
      setProgress(85);
      setStatusText('Loading Fresh Farm Quotas & VietGAP Certificates...');
    }, 1100);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Ready! Welcome to MarketLink.');
    }, 1550);

    const timerDone = setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerDone);
    };
  }, [duration, onComplete]);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: 'linear-gradient(135deg, #14532D 0%, #166534 50%, #0F3821 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        padding: '20px'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46, 213, 115, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} 
      />

      <div className="cube-loader-wrapper" style={{ marginBottom: '40px' }}>
        <div className="cube-loader">
          <div className="cube-face cube-front">🌱</div>
          <div className="cube-face cube-back">🥕</div>
          <div className="cube-face cube-right">🍅</div>
          <div className="cube-face cube-left">🍊</div>
          <div className="cube-face cube-top">🥗</div>
          <div className="cube-face cube-bottom">🌾</div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 
          style={{
            fontFamily: 'var(--font-header)',
            fontSize: '32px',
            fontWeight: '800',
            letterSpacing: '-0.5px',
            margin: '0 0 6px'
          }}
        >
          Market<span style={{ color: '#2dd56e' }}>Link</span>
        </h2>
        <p style={{ fontSize: '14px', color: '#bbf7d0', margin: 0, fontWeight: 500 }}>
          Local Farmers Market • Pre-Order & Pay At Pickup
        </p>
      </div>

      <div 
        style={{
          width: '320px',
          maxWidth: '85vw',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '999px',
          height: '10px',
          padding: '2px',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
          marginBottom: '16px'
        }}
      >
        <div 
          style={{
            height: '100%',
            width: `${progress}%`,
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #2dd56e 0%, #1FA855 100%)',
            boxShadow: '0 0 12px rgba(45, 213, 110, 0.8)',
            transition: 'width 0.4s ease'
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#e2e8f0' }}>
        <Sparkles size={15} color="#2dd56e" />
        <span>{statusText}</span>
        <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#2dd56e' }}>{progress}%</span>
      </div>
    </div>
  );
}
