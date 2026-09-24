import { useState, useEffect, useCallback } from 'react';
import { getFarmerDashboard, getAdminSystemStatus, getCustomerProfileSummary } from '@/api/rbacApi';

/**
 * useRbacData - Hook lấy dữ liệu theo từng Role từ API RBAC
 *
 * @param {string} role - 'farmer' | 'admin' | 'customer'
 * @param {boolean} isLoggedIn - Chỉ fetch khi đã đăng nhập
 *
 * Trả về:
 *   data       - Dữ liệu từ API tương ứng với role
 *   isLoading  - Đang fetch
 *   error      - Thông báo lỗi
 *   refetch()  - Fetch lại thủ công
 */
export function useRbacData(role, isLoggedIn) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!isLoggedIn || !role) return;

    setIsLoading(true);
    setError(null);
    try {
      let result = null;
      switch (role) {
        case 'farmer':
          result = await getFarmerDashboard();
          break;
        case 'admin':
          result = await getAdminSystemStatus();
          break;
        case 'customer':
          result = await getCustomerProfileSummary();
          break;
        default:
          break;
      }
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [role, isLoggedIn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
