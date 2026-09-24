import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, register as apiRegister, getCurrentUser, logout as apiLogout } from '@/api/authApi';
import { getStoredUser, saveUser } from '@/api/apiClient';

/**
 * AuthContext - Quản lý trạng thái xác thực toàn cục
 *
 * Cung cấp:
 *   user        - Thông tin user đang đăng nhập (null nếu chưa đăng nhập)
 *   isLoggedIn  - Boolean trạng thái đăng nhập
 *   isLoading   - Đang fetch thông tin user
 *   error       - Thông báo lỗi (nếu có)
 *   login(email, password) - Đăng nhập
 *   register(payload)      - Đăng ký
 *   logout()               - Đăng xuất
 *   refreshUser()          - Fetch lại /api/auth/me
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /** Khi có token lưu sẵn, fetch lại profile để đảm bảo dữ liệu mới nhất */
  const refreshUser = useCallback(async () => {
    const stored = getStoredUser();
    if (!stored) return;
    try {
      const profile = await getCurrentUser();
      if (profile && profile.userId) {
        setUser(profile);
        saveUser(profile);
      }
    } catch (err) {
      // Chỉ khi token thực sự hết hạn (401/403) mới xóa session
      if (err.message && (err.message.includes('401') || err.message.includes('403'))) {
        apiLogout();
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const authResponse = await apiLogin(email, password);
      // Đặt user ngay từ authResponse để đảm bảo UI phản hồi ngay lập tức
      setUser(authResponse);

      // Đồng thời cập nhật full profile từ /api/auth/me
      try {
        const profile = await getCurrentUser();
        if (profile && profile.userId) {
          setUser(profile);
          saveUser(profile);
        }
      } catch {
        // Sử dụng authResponse nếu chưa fetch được profile đầy đủ
      }
      return authResponse;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setIsLoading(true);
    setError(null);
    try {
      const authResponse = await apiRegister(payload);
      setUser(authResponse);

      try {
        const profile = await getCurrentUser();
        if (profile && profile.userId) {
          setUser(profile);
          saveUser(profile);
        }
      } catch {
        // Sử dụng authResponse nếu chưa fetch được profile đầy đủ
      }
      return authResponse;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    apiLogout();
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  /** Map role từ backend sang UI role string */
  const currentRole = (() => {
    if (!user?.roles) return 'customer';
    if (user.roles.includes('ROLE_ADMIN')) return 'admin';
    if (user.roles.includes('ROLE_FARMER')) return 'farmer';
    return 'customer';
  })();

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading,
    error,
    currentRole,
    login,
    register,
    logout,
    refreshUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Hook tiêu thụ AuthContext */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth phải được dùng bên trong <AuthProvider>');
  return ctx;
}
