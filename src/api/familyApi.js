/**
 * Family Account API - Tài khoản gia đình (Customer Family Account)
 * Tag: 8. Khách hàng - Tài khoản gia đình (Family Account)
 */

import { apiFetch } from './apiClient';

/**
 * Xem danh sách thành viên trong nhóm gia đình
 * @returns {Promise<Object>} ApiResponseListFamilyMemberResponse
 */
export async function getFamilyMembers() {
  return apiFetch('/api/customer/family/members');
}

/**
 * Xem danh sách lời mời gửi đi và nhận được
 * @returns {Promise<Object>} ApiResponseListFamilyInvitationResponse
 */
export async function getMyInvitations() {
  return apiFetch('/api/customer/family/invitations');
}

/**
 * Gửi lời mời tham gia nhóm gia đình
 * @param {string} inviteeEmail
 * @returns {Promise<Object>} ApiResponseFamilyInvitationResponse
 */
export async function inviteFamilyMember(inviteeEmail) {
  return apiFetch('/api/customer/family/invite', {
    method: 'POST',
    body: JSON.stringify({ inviteeEmail }),
  });
}

/**
 * Chấp nhận lời mời tham gia gia đình
 * @param {string} invitationToken
 * @returns {Promise<Object>} ApiResponseFamilyInvitationResponse
 */
export async function acceptFamilyInvitation(invitationToken) {
  return apiFetch('/api/customer/family/accept', {
    method: 'POST',
    body: JSON.stringify({ invitationToken }),
  });
}

/**
 * Từ chối lời mời tham gia gia đình
 * @param {string} invitationToken
 * @returns {Promise<Object>} ApiResponseFamilyInvitationResponse
 */
export async function rejectFamilyInvitation(invitationToken) {
  return apiFetch('/api/customer/family/reject', {
    method: 'POST',
    body: JSON.stringify({ invitationToken }),
  });
}

/**
 * Chủ nhóm xóa thành viên khỏi nhóm gia đình
 * @param {number|string} memberId
 * @returns {Promise<Object>} ApiResponseVoid
 */
export async function removeFamilyMember(memberId) {
  return apiFetch(`/api/customer/family/members/${memberId}`, {
    method: 'DELETE',
  });
}

/**
 * Thành viên tự rời khỏi nhóm gia đình
 * @returns {Promise<Object>} ApiResponseVoid
 */
export async function leaveFamily() {
  return apiFetch('/api/customer/family/leave', {
    method: 'DELETE',
  });
}
