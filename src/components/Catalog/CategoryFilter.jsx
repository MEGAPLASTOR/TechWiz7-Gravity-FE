import React from 'react';
import { 
  Sprout, 
  Salad, 
  Carrot, 
  Apple, 
  Egg, 
  Sparkles, 
  Flame 
} from 'lucide-react';

export default function CategoryFilter({
  categories = [],
  selectedCategory,
  onSelectCategory,
  quotaAlertText,
  panelTitle,
  heading,
  subtitle,
  filterLabels = {}
}) {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Salad': return <Salad size={16} />;
      case 'Carrot': return <Carrot size={16} />;
      case 'Apple': return <Apple size={16} />;
      case 'Egg': return <Egg size={16} />;
      default: return <Sparkles size={16} />;
    }
  };

  const getLabel = (cat) => {
    if (typeof cat === 'object') {
      return cat.label || filterLabels[cat.id] || cat.id;
    }
    return filterLabels[cat] || cat;
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span 
              className="clay-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                background: '#EAF4EC',
                color: '#1FA855',
                fontSize: '12px',
                fontWeight: '700'
              }}
            >
              <Sprout size={14} />
              {panelTitle}
            </span>
          </div>
          <h2 style={{ fontSize: '32px', color: '#101828', margin: 0 }}>
            {heading}
          </h2>
          <p style={{ fontSize: '15px', color: '#475467', margin: '4px 0 0' }}>
            {subtitle}
          </p>
        </div>

        <div 
          className="clay-card card-3d-tilt"
          style={{
            padding: '10px 18px',
            borderRadius: '16px',
            background: '#FFF9F5',
            border: '1px solid rgba(255, 122, 48, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Flame size={20} color="#FF7A30" />
          <div>
            <div style={{ fontSize: '11px', color: '#667085', fontWeight: 600 }}>Pre-Order Capacity Pulse</div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#FF7A30' }}>
              {quotaAlertText}
            </div>
          </div>
        </div>
      </div>

      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '28px',
          scrollbarWidth: 'none'
        }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="clay-pill"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                border: isSelected ? '2px solid #1FA855' : '1px solid rgba(0,0,0,0.06)',
                background: isSelected ? '#1FA855' : '#ffffff',
                color: isSelected ? '#ffffff' : '#344054',
                fontFamily: 'var(--font-header)',
                fontWeight: isSelected ? '700' : '600',
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: isSelected ? '0 6px 14px rgba(31, 168, 85, 0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {getCategoryIcon(cat.icon)}
              <span>{getLabel(cat)}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
