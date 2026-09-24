/**
 * Auth API - Xác thực & Người dùng
 * Tag: 1. Xác thực & Người dùng (Auth)
 *
 * Endpoints:
 *   POST /api/auth/register  - Đăng ký tài khoản mới
 *   POST /api/auth/login     - Đăng nhập, nhận JWT token
 *   GET  /api/auth/me        - Lấy thông tin tài khoản hiện tại
 */

import { apiFetch, saveToken, saveUser, clearToken } from './apiClient';

/**
 * Đăng ký tài khoản mới
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 * @param {string} payload.fullName
 * @param {string} [payload.phoneNumber]
 * @param {string} payload.role - 'FARMER' | 'CUSTOMER' | 'ADMIN'
 * @param {string} [payload.farmName]       - Chỉ dùng cho FARMER
 * @param {string} [payload.farmAddress]    - Chỉ dùng cho FARMER
 * @param {string} [payload.deliveryAddress] - Chỉ dùng cho CUSTOMER
 * @returns {Promise<AuthResponse>}
 */
export async function register(payload) {
  const data = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  // Tự động lưu token & user sau khi đăng ký thành công
  if (data.token) {
    saveToken(data.token);
    saveUser({
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      roles: data.roles,
    });
  }
  return data;
}

/**
 * Đăng nhập bằng Email & Password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<AuthResponse>}
 *
 * AuthResponse schema:
 *   { token, type, userId, fullName, email, roles[] }
 */
export async function login(email, password) {
  const data = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  // Tự động lưu token & user sau khi đăng nhập thành công
  if (data.token) {
    saveToken(data.token);
    saveUser({
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      roles: data.roles,
    });
  }
  return data;
}

/**
 * Lấy thông tin tài khoản đang đăng nhập (yêu cầu Bearer token)
 * @returns {Promise<UserProfileResponse>}
 *
 * UserProfileResponse schema:
 *   { userId, email, fullName, phoneNumber, avatarUrl, status, kycStatus, roles[], profileDetails }
 */
export async function getCurrentUser() {
  return apiFetch('/api/auth/me');
}

/**
 * Đăng xuất tài khoản
 */
export async function logout() {
  try {
    await apiFetch('/api/auth/logout', { method: 'POST' });
  } catch {
    // Vẫn dọn dẹp local token nếu server đã hết phiên
  } finally {
    clearToken();
  }
}

/**
 * Gửi mã OTP xác minh (Email/Phone/Reset password)
 * @param {string} emailOrPhone
 * @param {'EMAIL_CONFIRMATION' | 'PHONE_OTP' | 'PASSWORD_RESET'} type
 * @returns {Promise<Object>}
 */
export async function sendOtp(emailOrPhone, type = 'EMAIL_CONFIRMATION') {
  return apiFetch('/api/auth/verification/send-otp', {
    method: 'POST',
    body: JSON.stringify({ emailOrPhone, type }),
  });
}

/**
 * Xác minh mã OTP
 * @param {string} emailOrPhone
 * @param {'EMAIL_CONFIRMATION' | 'PHONE_OTP' | 'PASSWORD_RESET'} type
 * @param {string} code
 * @returns {Promise<Object>}
 */
export async function verifyOtp(emailOrPhone, type, code) {
  return apiFetch('/api/auth/verification/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ emailOrPhone, type, code }),
  });
}

/**
 * Đặt lại mật khẩu bằng mã OTP
 * @param {string} emailOrPhone
 * @param {string} code
 * @param {string} newPassword
 * @returns {Promise<Object>}
 */
export async function resetPassword(emailOrPhone, code, newPassword) {
  return apiFetch('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ emailOrPhone, code, newPassword }),
  });
}

