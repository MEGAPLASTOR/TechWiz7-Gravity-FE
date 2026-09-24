/**
 * Categories API - Danh mục sản phẩm
 * Tag: 2. Danh mục sản phẩm (Categories)
 *
 * Endpoints:
 *   GET /api/categories  - Lấy tất cả danh mục (Public, không cần token)
 *
 * Category schema:
 *   { categoryId, name, slug, description }
 */

import { apiFetch } from './apiClient';

/**
 * Lấy danh sách tất cả danh mục sản phẩm
 * @returns {Promise<Category[]>}
 */
export async function getAllCategories() {
  return apiFetch('/api/categories');
}
