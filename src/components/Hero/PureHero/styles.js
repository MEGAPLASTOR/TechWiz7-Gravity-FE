export const glass = (alpha = 0.72) => ({
  background: `rgba(235, 245, 238, ${alpha})`,
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1.5px solid rgba(255, 255, 255, 0.88)',
});

export const floatCard = (extra = {}) => ({
  ...glass(),
  borderRadius: '24px',
  boxShadow:
    '0 24px 48px rgba(0,0,0,0.18), 0 8px 16px rgba(0,0,0,0.10), inset 0 2px 4px rgba(255,255,255,0.95), inset -1px -1px 3px rgba(0,0,0,0.04)',
  ...extra,
});
