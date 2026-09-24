/**
 * RBAC API - Kiểm thử phân quyền Role-Based Access Control
 * Tag: 3. Kiểm thử phân quyền RBAC (Role-Based Access Control)
 *
 * Endpoints:
 *   GET /api/admin/system-status       - Chỉ dành cho ROLE_ADMIN
 *   GET /api/farmer/dashboard          - Chỉ dành cho ROLE_FARMER
 *   GET /api/customer/profile-summary  - Chỉ dành cho ROLE_CUSTOMER
 *
 * Tất cả endpoint đều yêu cầu Bearer Token hợp lệ.
 */

import { apiFetch } from './apiClient';

/**
 * Lấy trạng thái hệ thống (chỉ ADMIN)
 * @returns {Promise<Object>} - Map<string, object>
 */
export async function getAdminSystemStatus() {
  return apiFetch('/api/admin/system-status');
}

/**
 * Lấy dữ liệu dashboard nông dân (chỉ FARMER)
 * @returns {Promise<Object>} - Map<string, object>
 */
export async function getFarmerDashboard() {
  return apiFetch('/api/farmer/dashboard');
}

/**
 * Lấy tóm tắt hồ sơ khách hàng (chỉ CUSTOMER)
 * @returns {Promise<Object>} - Map<string, object>
 */
export async function getCustomerProfileSummary() {
  return apiFetch('/api/customer/profile-summary');
}
