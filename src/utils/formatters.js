export function formatCurrencyVND(amount) {
  const num = Number(amount);
  if (!Number.isFinite(num) || num <= 0) {
    return '0 ₫';
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatNumber(num) {
  return new Intl.NumberFormat('vi-VN').format(num);
}

export function calculateStockPercentage(current, total) {
  if (!total || total === 0) return 0;
  return Math.min(100, Math.round(((total - current) / total) * 100));
}
