import { useState, useEffect, useCallback } from 'react';
import { getFarmersAtMarket } from '@/api/marketsApi';
import { normalizeFarmerStall } from '@/services/productService';

/**
 * useProducts - Hook truy xuất danh sách sạp nông dân & nông sản tại phiên chợ được chọn
 * Sử dụng API thực tế GET /api/markets/{marketId}/farmers
 * Tuyệt đối không gọi các endpoint không tồn tại như /api/products
 * 
 * @param {string|number} selectedCategory - ID hoặc slug danh mục
 * @param {string} searchQuery - Từ khóa tìm kiếm
 * @param {Object} selectedMarket - Điểm chợ đang chọn
 */
export function useProducts(selectedCategory = 'all', searchQuery = '', selectedMarket = null) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const marketId = selectedMarket?.marketId || selectedMarket?.id;

  const fetchMarketStalls = useCallback(async () => {
    if (!marketId) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Gọi API thực tế: GET /api/markets/{id}/farmers
      const rawFarmers = await getFarmersAtMarket(marketId);
      
      if (Array.isArray(rawFarmers) && rawFarmers.length > 0) {
        let stalls = rawFarmers.map(normalizeFarmerStall).filter(Boolean);

        // Lọc theo danh mục nếu có chọn cụ thể
        if (selectedCategory && selectedCategory !== 'all') {
          stalls = stalls.filter((s) => 
            s.matchedCategories && s.matchedCategories.includes(String(selectedCategory))
          );
        }

        // Lọc theo từ khóa tìm kiếm nếu có
        if (searchQuery && searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          stalls = stalls.filter(
            (s) =>
              (s.name && s.name.toLowerCase().includes(q)) ||
              (s.farmer && s.farmer.toLowerCase().includes(q)) ||
              (s.farmLocation && s.farmLocation.toLowerCase().includes(q)) ||
              (s.description && s.description.toLowerCase().includes(q))
          );
        }

        setProducts(stalls);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.warn('Lỗi khi tải danh sách sạp nông dân từ API phiên chợ:', err?.message);
      setError(err?.message || 'Không thể tải dữ liệu từ phiên chợ');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [marketId, selectedCategory, searchQuery]);

  useEffect(() => {
    fetchMarketStalls();
  }, [fetchMarketStalls]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchMarketStalls,
  };
}
