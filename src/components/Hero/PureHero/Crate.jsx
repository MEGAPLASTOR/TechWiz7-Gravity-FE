import React from 'react';

export default function Crate({ emoji, count, size = 'md' }) {
  const w = size === 'lg' ? 70 : 58;
  const h = size === 'lg' ? 48 : 40;
  const sideW = size === 'lg' ? 14 : 11;
  const topH = size === 'lg' ? 10 : 8;
  const wood = { front: '#C1854D', side: '#95612A', top: '#D9A06A', border: '#7a4d1e' };

  return (
    <div style={{ position: 'relative', display: 'inline-block', cursor: 'default' }}>
      <svg
        width={w + sideW}
        height={h + topH + 4}
        viewBox={`0 0 ${w + sideW} ${h + topH + 4}`}
        style={{ display: 'block' }}
      >
        <polygon
          points={`${sideW},0 ${w + sideW},0 ${w},${topH} 0,${topH}`}
          fill={wood.top}
          stroke={wood.border}
          strokeWidth="1"
        />
        <rect
          x={0} y={topH} width={w} height={h}
          fill={wood.front}
          stroke={wood.border}
          strokeWidth="1"
        />
        {[0.25, 0.5, 0.75].map((r, i) => (
          <line key={i} x1={0} y1={topH + h * r} x2={w} y2={topH + h * r} stroke={wood.border} strokeWidth="0.5" opacity="0.35" />
        ))}
        <polygon
          points={`${w},${topH} ${w + sideW},0 ${w + sideW},${h} ${w},${h + topH}`}
          fill={wood.side}
          stroke={wood.border}
          strokeWidth="1"
        />
        <foreignObject x={4} y={topH + 4} width={w - 8} height={h - 8}>
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{ fontSize: size === 'lg' ? 22 : 18, textAlign: 'center', lineHeight: `${h - 8}px` }}
          >
            {emoji}
          </div>
        </foreignObject>
      </svg>
      {count !== undefined && (
        <span
          style={{
            position: 'absolute',
            top: -6,
            right: -6,
            background: '#ffffff',
            color: '#101828',
            fontSize: 9,
            fontWeight: 800,
            borderRadius: 5,
            padding: '1px 5px',
            border: '1px solid #D0D5DD',
            boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            fontFamily: 'var(--font-data)',
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}
