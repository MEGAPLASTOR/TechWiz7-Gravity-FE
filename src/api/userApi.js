/**
 * User Profile API - Quản lý Hồ sơ & Người dùng
 * Tag: 4. Quản lý Hồ sơ & Người dùng (User Profile)
 */

import { apiFetch, saveUser, getStoredUser } from './apiClient';

/**
 * Lấy toàn bộ thông tin tài khoản và thông tin chi tiết (Farmer/Customer)
 * @returns {Promise<UserProfileResponse>}
 */
export async function getMyProfile() {
  return apiFetch('/api/users/profile');
}

/**
 * Cập nhật thông tin hồ sơ
 * @param {Object} payload
 * @param {string} [payload.fullName]
 * @param {string} [payload.phoneNumber]
 * @param {string} [payload.defaultAddress]
 * @param {number} [payload.latitude]
 * @param {number} [payload.longitude]
 * @param {string} [payload.stallName]
 * @param {string} [payload.bio]
 * @param {string} [payload.farmAddress]
 * @returns {Promise<UserProfileResponse>}
 */
export async function updateProfile(payload) {
  const data = await apiFetch('/api/users/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  
  // Cập nhật lại localStorage nếu có thay đổi thông tin cơ bản
  const current = getStoredUser();
  if (current && data) {
    saveUser({
      ...current,
      fullName: data.fullName || current.fullName,
      email: data.email || current.email,
    });
  }
  return data;
}

/**
 * Đổi mật khẩu
 * @param {string} currentPassword
 * @param {string} newPassword
 * @returns {Promise<any>}
 */
export async function changePassword(currentPassword, newPassword) {
  return apiFetch('/api/users/profile/change-password', {
    method: 'PUT',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

/**
 * Cập nhật ảnh đại diện
 * @param {string} avatarUrl
 * @returns {Promise<any>}
 */
export async function updateAvatar(avatarUrl) {
  return apiFetch('/api/users/profile/avatar', {
    method: 'PATCH',
    body: JSON.stringify({ avatarUrl }),
  });
}
