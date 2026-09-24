import React from 'react';

export default function FreshCatalogWidget({ onExploreProducts }) {
  const previewItems = [
    { id: 1, icon: '📦', name: 'Fresh Veggies' },
    { id: 2, icon: '🍅', name: 'Ruby Tomatoes' },
    { id: 3, icon: '🍊', name: 'Tam Binh Oranges' }
  ];

  return (
    <div 
      className="clay-card animate-float-delayed"
      onClick={onExploreProducts}
      style={{
        position: 'absolute',
        right: '-16px',
        top: '110px',
        zIndex: 10,
        padding: '12px 10px',
        borderRadius: '22px',
        background: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12), inset 0 2px 4px #fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        border: '1px solid rgba(31, 168, 85, 0.25)',
        width: '82px'
      }}
    >
      <span style={{ fontSize: '10px', fontWeight: '800', color: '#1FA855', textAlign: 'center', lineHeight: 1.1 }}>
        Fresh<br />Catalog
      </span>

      {previewItems.map((item) => (
        <div 
          key={item.id}
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: '#F0FDF4',
            border: '1px solid rgba(31, 168, 85, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}
          title={item.name}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
