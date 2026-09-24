import React from 'react';

export default function IsoMap() {
  const B = ({ x, y, w = 30, h = 22, d = 8, color = '#d6edd9' }) => {
    const pts = {
      front: (cx, cy) => `${cx},${cy} ${cx + w},${cy} ${cx + w},${cy + d} ${cx},${cy + d}`,
      side: (cx, cy) => `${cx + w},${cy} ${cx + w + d},${cy - d} ${cx + w + d},${cy + d - d} ${cx + w},${cy + d}`,
    };
    return (
      <g>
        <rect
          x={x} y={y} width={w} height={h}
          fill={color} stroke="rgba(255,255,255,0.6)" strokeWidth="0.5"
          rx="2"
        />
        <polygon
          points={pts.front(x, y + h - 2)}
          fill="rgba(0,0,0,0.08)"
          stroke="none"
        />
        <polygon
          points={pts.side(x, y)}
          fill="rgba(0,0,0,0.12)"
          stroke="none"
        />
      </g>
    );
  };

  return (
    <svg width="100%" height="100" viewBox="0 0 210 100" style={{ borderRadius: 14 }}>
      <defs>
        <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9e8d2" />
          <stop offset="100%" stopColor="#b3dcc0" />
        </linearGradient>
      </defs>
      <rect width="210" height="100" fill="url(#mapBg)" rx="14" />

      <rect x="0" y="44" width="210" height="9" fill="rgba(255,255,255,0.85)" rx="2" />
      <rect x="78" y="0" width="9" height="100" fill="rgba(255,255,255,0.85)" rx="2" />
      <rect x="148" y="0" width="7" height="100" fill="rgba(255,255,255,0.75)" rx="2" />

      <B x={8}  y={8}  w={32} h={30} color="#e8f5ec" />
      <B x={46} y={10} w={24} h={28} color="#ddf0e3" />
      <B x={8}  y={56} w={28} h={36} color="#e8f5ec" />
      <B x={44} y={58} w={26} h={34} color="#cfe8d8" />
      <B x={90} y={8}  w={40} h={30} color="#e3f2e8" />
      <B x={90} y={56} w={36} h={36} color="#dff0e5" />
      <B x={158} y={8} w={40} h={30} color="#e0efe6" />
      <B x={158} y={58} w={40} h={36} color="#cce6d6" />

      {[
        { cx: 78, cy: 44, r: 8, color: '#1FA855', glow: '#1FA855' },
        { cx: 148, cy: 44, r: 6, color: '#2dd56e', glow: '#2dd56e' },
        { cx: 120, cy: 20, r: 5, color: '#56cf7a', glow: '#56cf7a' },
        { cx: 180, cy: 72, r: 5, color: '#1FA855', glow: '#1FA855' },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r={p.r + 5} fill={p.color} opacity={0.18} />
          <circle
            cx={p.cx} cy={p.cy} r={p.r}
            fill={p.color}
            stroke="#ffffff"
            strokeWidth="2"
            filter={`drop-shadow(0 0 4px ${p.glow})`}
          />
        </g>
      ))}
    </svg>
  );
}
