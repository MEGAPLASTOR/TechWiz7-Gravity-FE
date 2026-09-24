import React from 'react';

export default function CategoryChips({ activeCategory, onSelectCategory }) {
  const categories = [
    { id: 'leafy', label: 'Leafy Greens' },
    { id: 'veggies', label: 'Root Veggies' },
    { id: 'fruits', label: 'Fruits' },
    { id: 'dairy', label: 'Dairy' }
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
      {categories.map((c) => {
        const isSelected = activeCategory === c.id;
        return (
          <button
            key={c.id}
            onClick={() => onSelectCategory && onSelectCategory(c.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              border: isSelected ? '1px solid #1FA855' : '1px solid rgba(31, 168, 85, 0.25)',
              background: isSelected ? '#1FA855' : '#F0FDF4',
              color: isSelected ? '#ffffff' : '#15803d',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
