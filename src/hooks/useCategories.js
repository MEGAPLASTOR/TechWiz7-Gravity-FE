import { useState, useEffect, useCallback } from 'react';
import { getAllCategories } from '@/api/categoriesApi';

/**
 * useCategories - Hook lấy danh sách danh mục trực tiếp từ API backend (GET /api/categories)
 *
 * Trả về:
 *   categories  - Mảng danh mục lấy trực tiếp từ CSDL backend
 *   isLoading   - Trạng thái tải dữ liệu
 *   error       - Lỗi nếu có
 *   refetch()   - Tải lại dữ liệu
 */

function mapCategoryIcon(slug = '', name = '') {
  const s = slug.toLowerCase();
  const n = name.toLowerCase();
  if (s.includes('rau') || n.includes('rau')) return 'Salad';
  if (s.includes('cu') || n.includes('củ')) return 'Carrot';
  if (s.includes('trai') || s.includes('fruit') || n.includes('trái')) return 'Apple';
  if (s.includes('nam') || n.includes('nấm')) return 'Sparkles';
  if (s.includes('che-pham') || s.includes('trung') || n.includes('chế phẩm') || n.includes('trứng')) return 'Egg';
  return 'Sparkles';
}

export function useCategories() {
  const [categories, setCategories] = useState([
    { id: 'all', label: 'Tất cả nông sản', icon: 'Sparkles', categoryId: 0 }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllCategories();
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map((cat) => ({
          id: cat.slug || `cat-${cat.categoryId}`,
          categoryId: cat.categoryId,
          label: cat.name,
          icon: mapCategoryIcon(cat.slug, cat.name),
          description: cat.description,
          slug: cat.slug,
        }));
        setCategories([
          { id: 'all', label: 'Tất cả nông sản', icon: 'Sparkles', categoryId: 0 },
          ...mapped
        ]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, isLoading, error, refetch: fetchCategories };
}
