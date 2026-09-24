/**
 * Admin API - Quản trị viên (Admin KYC & Admin Users & System)
 * Tags:
 *   - 6. Quản trị viên - Phê duyệt KYC (Admin KYC)
 *   - 7. Quản trị viên - Quản lý Người dùng (Admin Users)
 *   - 3. Kiểm thử phân quyền RBAC
 *   - 5. Chợ nông sản & Bản đồ (Markets & Schedules)
 */

import { apiFetch } from './apiClient';
import { 
  createMarket, 
  updateMarket, 
  deleteMarket, 
  updateAssignmentStatus,
  getAllMarkets,
  getMarketDetail,
  getFarmersAtMarket
} from './marketsApi';
import { getAdminSystemStatus } from './rbacApi';

/**
 * Xem danh sách hồ sơ KYC chờ duyệt
 * @returns {Promise<Object>} ApiResponseListPendingFarmerKycResponse
 */
export async function getPendingKycList() {
  return apiFetch('/api/admin/kyc/pending');
}

/**
 * Xem chi tiết hồ sơ KYC của một nông dân
 * @param {number|string} farmerId
 * @returns {Promise<Object>} ApiResponseFarmerKycStatusResponse
 */
export async function getFarmerKycDetail(farmerId) {
  return apiFetch(`/api/admin/kyc/farmers/${farmerId}`);
}

/**
 * Phê duyệt hoặc từ chối hồ sơ KYC
 * @param {number|string} farmerId
 * @param {Object} payload
 * @param {'APPROVE'|'REJECT'|'REQUEST_REVISION'} payload.action
 * @param {string} [payload.reason]
 * @returns {Promise<Object>} ApiResponseFarmerKycStatusResponse
 */
export async function reviewFarmerKyc(farmerId, payload) {
  return apiFetch(`/api/admin/kyc/farmers/${farmerId}/review`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Tra cứu danh sách người dùng
 * @param {Object} [params]
 * @param {string} [params.keyword]
 * @param {string} [params.role] - ADMIN | FARMER | CUSTOMER
 * @param {string} [params.status] - ACTIVE | SUSPENDED
 * @param {string} [params.kycStatus] - UNVERIFIED | PENDING | VERIFIED | REJECTED
 * @returns {Promise<Object>} ApiResponseListAdminUserListItemResponse
 */
export async function getAdminUsers(params = {}) {
  const query = new URLSearchParams();
  if (params.keyword) query.append('keyword', params.keyword);
  if (params.role) query.append('role', params.role);
  if (params.status) query.append('status', params.status);
  if (params.kycStatus) query.append('kycStatus', params.kycStatus);

  const qs = query.toString();
  return apiFetch(`/api/admin/users${qs ? `?${qs}` : ''}`);
}

/**
 * Xem thông tin chi tiết một người dùng
 * @param {number|string} userId
 * @returns {Promise<Object>} ApiResponseAdminUserDetailResponse
 */
export async function getAdminUserDetail(userId) {
  return apiFetch(`/api/admin/users/${userId}`);
}

/**
 * Khóa hoặc Mở khóa tài khoản người dùng
 * @param {number|string} userId
 * @param {Object} payload
 * @param {'ACTIVE'|'SUSPENDED'|'PENDING'} payload.status
 * @param {string} [payload.reason]
 * @returns {Promise<Object>} ApiResponseAdminUserDetailResponse
 */
export async function updateUserStatus(userId, payload) {
  return apiFetch(`/api/admin/users/${userId}/status`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export {
  createMarket,
  updateMarket,
  deleteMarket,
  updateAssignmentStatus,
  getAllMarkets,
  getMarketDetail,
  getFarmersAtMarket,
  getAdminSystemStatus
};
