/**
 * Farmer API - Dành cho Nông dân (Farmer KYC & Market Assignments)
 * Tags: 
 *   - 5. Nông dân - Định danh KYC (Farmer KYC)
 *   - 5. Chợ nông sản & Bản đồ (Markets & Schedules)
 *   - 3. Kiểm thử phân quyền RBAC
 */

import { apiFetch } from './apiClient';
import { getMyMarketAssignments, registerFarmerMarket } from './marketsApi';
import { getFarmerDashboard } from './rbacApi';

/**
 * Nông dân nộp hồ sơ định danh KYC
 * @param {Object} payload
 * @param {Array<{documentType: string, documentUrl: string, documentNumber?: string, issuedDate?: string, expiryDate?: string}>} payload.documents
 * @returns {Promise<Object>}
 */
export async function submitFarmerKyc(payload) {
  return apiFetch('/api/farmer/kyc/submit', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Xem hồ sơ & trạng thái KYC cá nhân của Nông dân
 * @returns {Promise<Object>}
 */
export async function getMyKycDocuments() {
  return apiFetch('/api/farmer/kyc/my-documents');
}

export const registerMarket = registerFarmerMarket;
export { getMyMarketAssignments, registerFarmerMarket, getFarmerDashboard };
