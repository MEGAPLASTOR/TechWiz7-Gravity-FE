/**
 * Markets API - Chợ nông sản & Bản đồ (Markets & Schedules)
 * Tag: 5. Chợ nông sản & Bản đồ (Markets & Schedules)
 *
 * Endpoints:
 *   GET    /api/markets                         - Lấy danh sách tất cả điểm chợ
 *   GET    /api/markets/{id}                    - Lấy chi tiết chợ kèm lịch họp
 *   GET    /api/markets/{id}/farmers            - Lấy danh sách sạp nông dân tại chợ
 *   GET    /api/markets/filter-by-day?dayOfWeek - Lọc chợ theo ngày họp trong tuần (1-7)
 *   POST   /api/farmer/markets/register         - Nông dân đăng ký tham gia chợ
 *   GET    /api/farmer/markets/my-assignments   - Xem danh sách chợ nông dân đã tham gia
 *   POST   /api/admin/markets                   - Admin tạo mới điểm chợ
 *   PUT    /api/admin/markets/{id}              - Admin cập nhật thông tin chợ
 *   DELETE /api/admin/markets/{id}              - Admin xóa chợ
 *   PATCH  /api/admin/markets/assignments/{id}/status - Admin phê duyệt/từ chối sạp
 */

import { apiFetch } from './apiClient';

/**
 * Lấy danh sách tất cả chợ nông sản đang hoạt động
 * @returns {Promise<Array>}
 */
export async function getAllMarkets() {
  return apiFetch('/api/markets');
}

/**
 * Lấy chi tiết một chợ theo ID (bao gồm lịch họp chợ)
 * @param {number|string} marketId
 * @returns {Promise<Object>}
 */
export async function getMarketDetail(marketId) {
  return apiFetch(`/api/markets/${marketId}`);
}

/**
 * Lấy danh sách nông dân / sạp đang hoạt động tại chợ
 * @param {number|string} marketId
 * @returns {Promise<Array>}
 */
export async function getFarmersAtMarket(marketId) {
  return apiFetch(`/api/markets/${marketId}/farmers`);
}

/**
 * Lọc chợ theo ngày họp trong tuần (1: Thứ 2, ..., 6: Thứ 7, 7: Chủ nhật)
 * @param {number} dayOfWeek (1 - 7)
 * @returns {Promise<Array>}
 */
export async function filterMarketsByDay(dayOfWeek) {
  return apiFetch(`/api/markets/filter-by-day?dayOfWeek=${dayOfWeek}`);
}

/**
 * Nông dân đăng ký tham gia bán hàng tại chợ
 * @param {Object} payload
 * @param {number} payload.marketId
 * @param {string} [payload.stallNumber]
 * @returns {Promise<Object>}
 */
export async function registerFarmerMarket(payload) {
  return apiFetch('/api/farmer/markets/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Lấy danh sách chợ nông dân hiện tại đã đăng ký
 * @returns {Promise<Array>}
 */
export async function getMyMarketAssignments() {
  return apiFetch('/api/farmer/markets/my-assignments');
}

/**
 * Admin: Tạo chợ nông sản mới
 * @param {Object} marketData
 * @returns {Promise<Object>}
 */
export async function createMarket(marketData) {
  return apiFetch('/api/admin/markets', {
    method: 'POST',
    body: JSON.stringify(marketData),
  });
}

/**
 * Admin: Cập nhật thông tin chợ nông sản
 * @param {number|string} marketId
 * @param {Object} marketData
 * @returns {Promise<Object>}
 */
export async function updateMarket(marketId, marketData) {
  return apiFetch(`/api/admin/markets/${marketId}`, {
    method: 'PUT',
    body: JSON.stringify(marketData),
  });
}

/**
 * Admin: Xóa điểm chợ
 * @param {number|string} marketId
 * @returns {Promise<any>}
 */
export async function deleteMarket(marketId) {
  return apiFetch(`/api/admin/markets/${marketId}`, {
    method: 'DELETE',
  });
}

/**
 * Admin: Duyệt hoặc thay đổi trạng thái sạp nông dân tại chợ
 * @param {number|string} assignmentId
 * @param {string} status - 'ACTIVE' | 'REGISTERED' | 'REVOKED'
 * @returns {Promise<Object>}
 */
export async function updateAssignmentStatus(assignmentId, status) {
  return apiFetch(`/api/admin/markets/assignments/${assignmentId}/status?status=${status}`, {
    method: 'PATCH',
  });
}
