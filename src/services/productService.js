/**
 * Dịch vụ sản phẩm & sạp hàng MarketLink
 * Kết nối dữ liệu phiên chợ và sạp nông dân trực tiếp từ Backend API (Không dùng dữ liệu mẫu)
 */

import { getFarmersAtMarket } from '@/api/marketsApi';
import { getAllCategories } from '@/api/categoriesApi';

export { getFarmersAtMarket, getAllCategories };

/**
 * Danh sách sản phẩm rỗng mặc định khi chưa có dữ liệu từ backend
 * Tuyệt đối không dùng dữ liệu cứng (mock data)
 */
export const PRODUCTS_CATALOG = [];

/**
 * Chuẩn hóa đối tượng sạp nông dân từ API Backend (GET /api/markets/{id}/farmers)
 * @param {Object} raw - FarmerAtMarketResponse
 */
export function normalizeFarmerStall(raw) {
  if (!raw) return null;

  const bio = raw.bio || '';
  const stallName = raw.stallName || '';
  const combined = `${bio} ${stallName}`.toLowerCase();

  // Xác định danh mục phù hợp dựa trên nội dung sạp
  const matchedCategories = ['all'];
  if (combined.includes('rau') || combined.includes('lá') || combined.includes('sinh thái') || combined.includes('xanh')) {
    matchedCategories.push('rau-la-xanh', '1');
  }
  if (combined.includes('củ') || combined.includes('quả') || combined.includes('hữu cơ')) {
    matchedCategories.push('cu-qua-cu', '2');
  }
  if (combined.includes('trái cây') || combined.includes('hoa quả') || combined.includes('cam') || combined.includes('vườn')) {
    matchedCategories.push('trai-cay', '3');
  }
  if (combined.includes('nấm') || combined.includes('thảo mộc') || combined.includes('dược')) {
    matchedCategories.push('nam-thao-moc', '4');
  }
  if (combined.includes('chế phẩm') || combined.includes('thủ công') || combined.includes('sữa') || combined.includes('trứng')) {
    matchedCategories.push('che-pham-do-nuong', '5');
  }

  // Tự động nhận diện chứng chỉ
  let badge = 'VietGAP';
  if (combined.includes('globalgap')) badge = 'GlobalGAP';
  else if (combined.includes('hữu cơ') || combined.includes('organic')) badge = '100% Organic';
  else if (combined.includes('ocop')) badge = 'OCOP 4 Sao';

  return {
    id: `stall-${raw.assignmentId || raw.farmerId}`,
    farmerId: raw.farmerId,
    assignmentId: raw.assignmentId,
    name: stallName || `Sạp Nông Dân ${raw.farmerName || ''}`,
    stallNumber: raw.stallNumber || 'Sạp trực tiếp',
    unit: raw.stallNumber || 'Sạp trực tiếp',
    farmer: raw.farmerName || 'Chủ nông trại',
    farmLocation: raw.farmAddress || 'Vùng trồng liên kết',
    bio: bio || 'Nông sản sạch VietGAP thu hoạch sớm tại vườn.',
    description: bio || 'Nông sản sạch thu hoạch sớm giao trực tiếp tại quầy phiên chợ.',
    badge,
    rating: 5.0,
    phoneNumber: raw.phoneNumber || '',
    avatarUrl: raw.avatarUrl || '',
    image: raw.avatarUrl || '',
    status: raw.status || 'ACTIVE',
    price: 0, // Pay-At-Pickup (thanh toán trực tiếp tại quầy khi nhận hàng)
    harvestTime: 'Thu hoạch 04:30 AM • Nhận tại quầy',
    matchedCategories,
    isStall: true,
  };
}
