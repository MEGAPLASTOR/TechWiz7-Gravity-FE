import React from 'react';
import { Clock, Check } from 'lucide-react';
import { TIME_SLOTS_DATA } from '@/services/marketService';

export default function TimeSlotSelector({ 
  selectedSlot, 
  onSelectSlot, 
  slots = TIME_SLOTS_DATA,
  t 
}) {
  return (
    <div 
      className="clay-card card-3d-tilt"
      style={{
        padding: '22px',
        borderRadius: '24px',
        background: '#ffffff'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} color="#1FA855" />
          <h4 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: '#101828' }}>
            {t.slotSelectorTitle}
          </h4>
        </div>
        <span style={{ fontSize: '11px', color: '#667085', fontWeight: 600 }}>
          {t.slotCapacityMax}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
        {slots.map((slot) => {
          const isSelected = selectedSlot?.id === slot.id;
          const isFull = slot.status === 'full';

          return (
            <div
              key={slot.id}
              onClick={() => !isFull && onSelectSlot(slot)}
              style={{
                padding: '12px 10px',
                borderRadius: '16px',
                border: isSelected 
                  ? '2px solid #1FA855' 
                  : isFull 
                  ? '1px dashed #D0D5DD' 
                  : '1px solid #E4E7EC',
                background: isSelected 
                  ? '#F0FDF4' 
                  : isFull 
                  ? '#F9FAFB' 
                  : '#ffffff',
                cursor: isFull ? 'not-allowed' : 'pointer',
                opacity: isFull ? 0.6 : 1,
                textAlign: 'center',
                transition: 'all 0.2s ease',
                position: 'relative',
                boxShadow: isSelected ? '0 4px 12px rgba(31, 168, 85, 0.2)' : 'none'
              }}
            >
              {slot.recommended && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#FF7A30',
                    color: '#ffffff',
                    fontSize: '9px',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {t.recommendedSlot}
                </span>
              )}

              <div 
                style={{ 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  marginBottom: '4px',
                  color: isFull ? '#98A2B3' : isSelected ? '#15803d' : '#1D2939'
                }}
              >
                {slot.label}
              </div>

              <div 
                style={{
                  fontSize: '10px',
                  fontWeight: '600',
                  color: isFull ? '#98A2B3' : slot.status === 'low' ? '#FF7A30' : '#1FA855',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                {isSelected && !isFull && <Check size={11} strokeWidth={3} />}
                <span>
                  {isFull ? t.slotsFull : `${slot.available}/${slot.capacity} ${t.slotsLeft}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
