/**
 * Dịch vụ thị trường và phiên chợ MarketLink
 * Kết nối dữ liệu phiên chợ thực tế từ Backend API
 */

import { getAllMarkets, getMarketDetail, getFarmersAtMarket } from '@/api/marketsApi';

export { getAllMarkets, getMarketDetail, getFarmersAtMarket };

// Danh sách khung giờ nhận hàng tại quầy (Slot Pickup)
export const TIME_SLOTS_DATA = [
  {
    id: 'slot-1',
    label: '06:00 - 06:30 AM',
    available: 12,
    capacity: 15,
    status: 'available',
    recommended: false,
  },
  {
    id: 'slot-2',
    label: '06:30 - 07:00 AM',
    available: 8,
    capacity: 15,
    status: 'available',
    recommended: true,
  },
  {
    id: 'slot-3',
    label: '07:00 - 07:30 AM',
    available: 15,
    capacity: 15,
    status: 'available',
    recommended: true,
  },
  {
    id: 'slot-4',
    label: '07:30 - 08:00 AM',
    available: 5,
    capacity: 15,
    status: 'low',
    recommended: false,
  },
  {
    id: 'slot-5',
    label: '08:00 - 08:30 AM',
    available: 2,
    capacity: 15,
    status: 'low',
    recommended: false,
  },
  {
    id: 'slot-6',
    label: '08:30 - 09:00 AM',
    available: 10,
    capacity: 15,
    status: 'available',
    recommended: false,
  },
];

// Hàm sinh khung giờ nhận hàng dựa trên lịch hoạt động thực tế của phiên chợ
export function generateMarketTimeSlots(schedules) {
  if (!schedules || schedules.length === 0) {
    return TIME_SLOTS_DATA;
  }

  // Lấy lịch hoạt động sớm nhất / đại diện
  const schedule = schedules[0];
  const openHour = parseInt((schedule.openingTime || '06:00:00').split(':')[0], 10);
  const closeHour = parseInt((schedule.closingTime || '11:00:00').split(':')[0], 10);

  const slots = [];
  let slotIndex = 1;

  for (let h = openHour; h < closeHour; h++) {
    const hStr = h.toString().padStart(2, '0');
    const hNextStr = (h + 1).toString().padStart(2, '0');
    
    // Nửa tiếng đầu: :00 - :30
    slots.push({
      id: `slot-${slotIndex++}`,
      label: `${hStr}:00 - ${hStr}:30`,
      available: 15,
      capacity: 15,
      status: 'available',
      recommended: slotIndex === 2 || slotIndex === 3,
    });

    // Nửa tiếng sau: :30 - :00
    slots.push({
      id: `slot-${slotIndex++}`,
      label: `${hStr}:30 - ${hNextStr}:00`,
      available: 12,
      capacity: 15,
      status: 'available',
      recommended: false,
    });
  }

  return slots.length > 0 ? slots : TIME_SLOTS_DATA;
}

// Fallback rỗng khi chưa có dữ liệu từ backend
export const MARKETS_DATA = [];

