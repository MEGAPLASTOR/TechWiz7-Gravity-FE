/**
 * RBAC & Quota Service
 * Các định nghĩa và tiện ích liên quan đến phân quyền và định mức
 */

export const DEFAULT_QUOTA_DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

/**
 * Định dạng nhãn trạng thái KYC
 * @param {string} status - UNVERIFIED | PENDING | VERIFIED | REJECTED
 */
export function formatKycStatus(status) {
  switch (status?.toUpperCase()) {
    case 'VERIFIED':
      return { label: 'Đã xác minh VietGAP', color: '#1FA855', bg: '#ECFDF3' };
    case 'PENDING':
      return { label: 'Chờ xét duyệt', color: '#FF7A30', bg: '#FFF4ED' };
    case 'REJECTED':
      return { label: 'Bị từ chối', color: '#D92D20', bg: '#FEE4E2' };
    default:
      return { label: 'Chưa nộp hồ sơ', color: '#667085', bg: '#F2F4F7' };
  }
}

/**
 * Định dạng vai trò người dùng
 * @param {string|string[]} roles
 */
export function formatUserRole(roles) {
  const roleList = Array.isArray(roles) ? roles : [roles];
  if (roleList.some(r => r === 'ROLE_ADMIN' || r === 'ADMIN' || r === 'admin')) {
    return { label: 'Quản trị viên (Admin)', badge: 'ADMIN', color: '#2563EB' };
  }
  if (roleList.some(r => r === 'ROLE_FARMER' || r === 'FARMER' || r === 'farmer')) {
    return { label: 'Nhà vườn / Nông dân', badge: 'FARMER', color: '#FF7A30' };
  }
  return { label: 'Khách mua nông sản', badge: 'CUSTOMER', color: '#1FA855' };
}
