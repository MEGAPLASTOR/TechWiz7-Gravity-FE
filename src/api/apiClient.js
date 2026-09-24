/**
 * API Client an toàn cho MarketLink
 * Sử dụng đường dẫn tương đối (relative path) để đi qua proxy/reverse-proxy
 * Tuyệt đối không để lộ IP, cổng hay thông tin server backend ra phía client
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/** Lấy JWT token từ localStorage */
function getToken() {
  return localStorage.getItem('ml_token');
}

/** Lưu JWT token vào localStorage */
export function saveToken(token) {
  localStorage.setItem('ml_token', token);
}

/** Xóa JWT token (đăng xuất) */
export function clearToken() {
  localStorage.removeItem('ml_token');
  localStorage.removeItem('ml_user');
}

/** Lưu thông tin user vào localStorage */
export function saveUser(user) {
  localStorage.setItem('ml_user', JSON.stringify(user));
}

/** Lấy thông tin user từ localStorage */
export function getStoredUser() {
  try {
    const raw = localStorage.getItem('ml_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Hàm gọi API chung - Bảo mật, không để lộ thông tin hạ tầng backend
 * @param {string} endpoint - Đường dẫn API (ví dụ: /api/auth/login)
 * @param {RequestInit} options - Tùy chọn fetch
 * @returns {Promise<any>} - Dữ liệu trả về
 */
export async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;
  try {
    response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch {
    // Không để lộ lỗi mạng nội bộ, CORS hoặc IP backend
    throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.');
  }

  if (!response.ok) {
    let errorMessage = 'Yêu cầu không thể thực hiện. Vui lòng thử lại sau.';
    try {
      const errorBody = await response.json();
      const rawMsg = errorBody.message || errorBody.error || '';

      // Lọc bỏ các thông tin nhạy cảm về hệ thống, SQL, Hibernate, Spring, exception class
      const isSensitive = 
        rawMsg.includes('Exception') ||
        rawMsg.includes('SQL') ||
        rawMsg.includes('org.hibernate') ||
        rawMsg.includes('com.') ||
        rawMsg.includes('org.springframework') ||
        rawMsg.includes('trace') ||
        rawMsg.includes('stackTrace');

      if (rawMsg && !isSensitive) {
        errorMessage = rawMsg;
      } else if (response.status === 401) {
        errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
      } else if (response.status === 403) {
        errorMessage = 'Bạn không có quyền thực hiện thao tác này.';
      } else if (response.status === 404) {
        errorMessage = 'Không tìm thấy dữ liệu yêu cầu.';
      } else if (response.status >= 500) {
        errorMessage = 'Hệ thống đang bảo trì hoặc xử lý chậm. Vui lòng thử lại sau.';
      }
    } catch {
      // Không parse được json, giữ message an toàn mặc định
    }
    throw new Error(errorMessage);
  }

  // Xử lý trường hợp response rỗng (204 No Content)
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}
