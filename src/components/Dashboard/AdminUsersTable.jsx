import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Lock, 
  Unlock, 
  Eye, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  XCircle,
  AlertCircle
} from 'lucide-react';
import { getAdminUsers, getAdminUserDetail, updateUserStatus } from '@/api/adminApi';

export default function AdminUsersTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [keyword, setKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [kycFilter, setKycFilter] = useState('');

  // Selected User Detail Modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Status Action Modal (Lock / Unlock)
  const [actionTarget, setActionTarget] = useState(null); // { user, nextStatus }
  const [actionReason, setActionReason] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [toastMsg, setToastMsg] = useState({ text: '', type: '' });

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getAdminUsers({
        keyword: keyword.trim() || undefined,
        role: roleFilter || undefined,
        status: statusFilter || undefined,
        kycStatus: kycFilter || undefined,
      });
      // Response schema: ApiResponseListAdminUserListItemResponse -> res.data is array or res is array
      const list = Array.isArray(res) ? res : (Array.isArray(res?.data) ? res.data : []);
      setUsers(list);
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách người dùng.');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [keyword, roleFilter, statusFilter, kycFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  const handleViewDetail = async (userId) => {
    setIsLoadingDetail(true);
    setSelectedUser(null);
    try {
      const res = await getAdminUserDetail(userId);
      const detail = res?.data || res;
      setSelectedUser(detail);
    } catch (err) {
      setToastMsg({ text: err.message || 'Không thể tải chi tiết người dùng.', type: 'error' });
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleOpenStatusModal = (user, nextStatus) => {
    setActionTarget({ user, nextStatus });
    setActionReason(nextStatus === 'SUSPENDED' ? 'Tài khoản vi phạm quy định nền tảng.' : 'Đã xác minh và kích hoạt lại tài khoản.');
  };

  const handleConfirmStatus = async () => {
    if (!actionTarget) return;
    setIsUpdatingStatus(true);
    try {
      await updateUserStatus(actionTarget.user.userId, {
        status: actionTarget.nextStatus,
        reason: actionReason,
      });
      setToastMsg({ 
        text: `Đã ${actionTarget.nextStatus === 'SUSPENDED' ? 'khóa' : 'mở khóa'} tài khoản thành công!`, 
        type: 'success' 
      });
      setActionTarget(null);
      fetchUsers();
      if (selectedUser?.userId === actionTarget.user.userId) {
        handleViewDetail(actionTarget.user.userId);
      }
    } catch (err) {
      setToastMsg({ text: err.message || 'Cập nhật trạng thái thất bại.', type: 'error' });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div 
      className="clay-card"
      style={{ padding: '24px', borderRadius: '28px', background: '#ffffff' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '18px', color: '#101828', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} color="#2563EB" />
            Quản Lý Người Dùng Hệ Thống (Admin Users)
          </h3>
          <p style={{ fontSize: '13px', color: '#667085', margin: '4px 0 0' }}>
            Tra cứu người dùng, quản trị vai trò, duyệt KYC và khóa/kích hoạt tài khoản thời gian thực
          </p>
        </div>
        <button
          onClick={fetchUsers}
          style={{
            background: '#EFF8FF',
            color: '#2563EB',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          Làm mới ↻
        </button>
      </div>

      {/* Toast Alert */}
      {toastMsg.text && (
        <div style={{
          padding: '10px 14px',
          borderRadius: '10px',
          marginBottom: '16px',
          fontSize: '13px',
          fontWeight: 600,
          background: toastMsg.type === 'success' ? '#ECFDF3' : '#FEE4E2',
          color: toastMsg.type === 'success' ? '#027A48' : '#D92D20',
          border: `1px solid ${toastMsg.type === 'success' ? '#A6F4C5' : '#FECDCA'}`
        }}>
          {toastMsg.text}
        </div>
      )}

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search size={16} color="#98A2B3" style={{ position: 'absolute', top: '12px', left: '12px' }} />
          <input
            type="text"
            placeholder="Tìm theo tên, email, SĐT..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              borderRadius: '12px',
              border: '1px solid #D0D5DD',
              fontSize: '13px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '12px',
            border: '1px solid #D0D5DD',
            fontSize: '13px',
            background: '#fff',
            color: '#344054'
          }}
        >
          <option value="">Tất cả vai trò</option>
          <option value="ROLE_CUSTOMER">Khách Hàng (Customer)</option>
          <option value="ROLE_FARMER">Nông Dân (Farmer)</option>
          <option value="ROLE_ADMIN">Quản Trị (Admin)</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '12px',
            border: '1px solid #D0D5DD',
            fontSize: '13px',
            background: '#fff',
            color: '#344054'
          }}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="ACTIVE">Hoạt động (ACTIVE)</option>
          <option value="SUSPENDED">Bị khóa (SUSPENDED)</option>
          <option value="PENDING">Chờ xử lý (PENDING)</option>
        </select>

        <select
          value={kycFilter}
          onChange={(e) => setKycFilter(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '12px',
            border: '1px solid #D0D5DD',
            fontSize: '13px',
            background: '#fff',
            color: '#344054'
          }}
        >
          <option value="">Trạng thái KYC</option>
          <option value="VERIFIED">Đã duyệt (VERIFIED)</option>
          <option value="PENDING">Chờ duyệt (PENDING)</option>
          <option value="REJECTED">Từ chối (REJECTED)</option>
          <option value="UNVERIFIED">Chưa nộp (UNVERIFIED)</option>
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div style={{ padding: '36px', textAlign: 'center', color: '#667085', fontSize: '14px' }}>
          Đang tải danh sách người dùng từ máy chủ...
        </div>
      ) : users.length === 0 ? (
        <div style={{ padding: '36px', textAlign: 'center', background: '#F9FAFB', borderRadius: '18px', border: '1px dashed #D0D5DD' }}>
          <Users size={32} color="#98A2B3" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontWeight: 700, color: '#344054' }}>
            Không tìm thấy người dùng nào phù hợp
          </div>
          <p style={{ fontSize: '13px', color: '#667085', margin: '4px 0 0' }}>
            Thử thay đổi từ khóa hoặc bộ lọc vai trò / trạng thái.
          </p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E4E7EC' }}>
                <th style={{ padding: '12px 14px', fontWeight: '700', color: '#475467' }}>Người Dùng</th>
                <th style={{ padding: '12px 14px', fontWeight: '700', color: '#475467' }}>Liên Hệ</th>
                <th style={{ padding: '12px 14px', fontWeight: '700', color: '#475467' }}>Vai Trò</th>
                <th style={{ padding: '12px 14px', fontWeight: '700', color: '#475467' }}>Trạng Thái</th>
                <th style={{ padding: '12px 14px', fontWeight: '700', color: '#475467' }}>KYC</th>
                <th style={{ padding: '12px 14px', fontWeight: '700', color: '#475467' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isFarmer = u.roles?.some(r => r.includes('FARMER'));
                const isAdmin = u.roles?.some(r => r.includes('ADMIN'));
                const isActive = u.status === 'ACTIVE';

                return (
                  <tr key={u.userId} style={{ borderBottom: '1px solid #F2F4F7' }}>
                    <td style={{ padding: '14px' }}>
                      <div style={{ fontWeight: '700', color: '#101828' }}>{u.fullName || 'Người Dùng'}</div>
                      <div style={{ fontSize: '11px', color: '#667085' }}>ID: #{u.userId}</div>
                    </td>
                    <td style={{ padding: '14px', color: '#475467' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                        <Mail size={12} color="#667085" /> {u.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', marginTop: '2px' }}>
                        <Phone size={12} color="#667085" /> {u.phoneNumber || '—'}
                      </div>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span style={{
                        background: isAdmin ? '#EFF8FF' : isFarmer ? '#FFF4ED' : '#F0FDF4',
                        color: isAdmin ? '#2563EB' : isFarmer ? '#FF7A30' : '#1FA855',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}>
                        {isAdmin ? 'ADMIN' : isFarmer ? 'FARMER' : 'CUSTOMER'}
                      </span>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span style={{
                        background: isActive ? '#ECFDF3' : '#FEE4E2',
                        color: isActive ? '#027A48' : '#D92D20',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}>
                        {isActive ? 'Hoạt động' : 'Bị khóa'}
                      </span>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span style={{
                        background: u.kycStatus === 'VERIFIED' ? '#ECFDF3' : u.kycStatus === 'PENDING' ? '#FFF4ED' : '#F2F4F7',
                        color: u.kycStatus === 'VERIFIED' ? '#027A48' : u.kycStatus === 'PENDING' ? '#FF7A30' : '#667085',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}>
                        {u.kycStatus || 'UNVERIFIED'}
                      </span>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => handleViewDetail(u.userId)}
                          title="Xem chi tiết"
                          style={{
                            background: '#F2F4F7',
                            color: '#344054',
                            border: 'none',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Eye size={13} /> Chi tiết
                        </button>

                        {isActive ? (
                          <button
                            onClick={() => handleOpenStatusModal(u, 'SUSPENDED')}
                            title="Khóa tài khoản"
                            style={{
                              background: '#FEE4E2',
                              color: '#D92D20',
                              border: 'none',
                              padding: '6px 10px',
                              borderRadius: '8px',
                              fontWeight: '700',
                              fontSize: '12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Lock size={13} /> Khóa
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenStatusModal(u, 'ACTIVE')}
                            title="Mở khóa tài khoản"
                            style={{
                              background: '#ECFDF3',
                              color: '#027A48',
                              border: 'none',
                              padding: '6px 10px',
                              borderRadius: '8px',
                              fontWeight: '700',
                              fontSize: '12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Unlock size={13} /> Mở khóa
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 110,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedUser(null)}
        >
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '28px',
              width: '100%',
              maxWidth: '650px',
              maxHeight: '85vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '20px', color: '#101828' }}>
                  {selectedUser.fullName}
                </h4>
                <div style={{ fontSize: '13px', color: '#667085', marginTop: '2px' }}>
                  {selectedUser.email} • ID: #{selectedUser.userId}
                </div>
              </div>
              <span style={{
                background: selectedUser.status === 'ACTIVE' ? '#ECFDF3' : '#FEE4E2',
                color: selectedUser.status === 'ACTIVE' ? '#027A48' : '#D92D20',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                {selectedUser.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px', fontSize: '13px' }}>
              <div style={{ background: '#F9FAFB', padding: '12px 14px', borderRadius: '12px' }}>
                <div style={{ color: '#667085', fontSize: '11px', fontWeight: 600 }}>SỐ ĐIỆN THOẠI</div>
                <div style={{ color: '#101828', fontWeight: 700, marginTop: '2px' }}>{selectedUser.phoneNumber || 'Chưa cập nhật'}</div>
              </div>
              <div style={{ background: '#F9FAFB', padding: '12px 14px', borderRadius: '12px' }}>
                <div style={{ color: '#667085', fontSize: '11px', fontWeight: 600 }}>TRẠNG THÁI KYC</div>
                <div style={{ color: '#101828', fontWeight: 700, marginTop: '2px' }}>{selectedUser.kycStatus || 'UNVERIFIED'}</div>
              </div>
              {selectedUser.stallName && (
                <div style={{ background: '#F9FAFB', padding: '12px 14px', borderRadius: '12px', gridColumn: 'span 2' }}>
                  <div style={{ color: '#667085', fontSize: '11px', fontWeight: 600 }}>TÊN GIAN HÀNG / TRANG TRẠI</div>
                  <div style={{ color: '#1FA855', fontWeight: 700, marginTop: '2px' }}>{selectedUser.stallName}</div>
                </div>
              )}
              {selectedUser.farmAddress && (
                <div style={{ background: '#F9FAFB', padding: '12px 14px', borderRadius: '12px', gridColumn: 'span 2' }}>
                  <div style={{ color: '#667085', fontSize: '11px', fontWeight: 600 }}>ĐỊA CHỈ TRANG TRẠI</div>
                  <div style={{ color: '#101828', marginTop: '2px' }}>{selectedUser.farmAddress}</div>
                </div>
              )}
              {selectedUser.defaultAddress && (
                <div style={{ background: '#F9FAFB', padding: '12px 14px', borderRadius: '12px', gridColumn: 'span 2' }}>
                  <div style={{ color: '#667085', fontSize: '11px', fontWeight: 600 }}>ĐỊA CHỈ NHẬN HÀNG MẶC ĐỊNH</div>
                  <div style={{ color: '#101828', marginTop: '2px' }}>{selectedUser.defaultAddress}</div>
                </div>
              )}
            </div>

            {/* Audit Logs */}
            {selectedUser.auditLogs && selectedUser.auditLogs.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#101828', marginBottom: '8px' }}>
                  Nhật Ký Kiểm Duyệt ({selectedUser.auditLogs.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedUser.auditLogs.map((log) => (
                    <div 
                      key={log.logId}
                      style={{
                        padding: '10px 12px',
                        background: '#F9FAFB',
                        borderRadius: '10px',
                        fontSize: '12px',
                        borderLeft: `3px solid ${log.action === 'APPROVE' ? '#1FA855' : log.action === 'SUSPEND' ? '#D92D20' : '#FF7A30'}`
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, color: '#101828' }}>{log.action}</span>
                        <span style={{ color: '#667085' }}>{log.reviewedAt}</span>
                      </div>
                      <div style={{ color: '#475467' }}>{log.reason}</div>
                      <div style={{ fontSize: '11px', color: '#667085', marginTop: '2px' }}>Duyệt bởi: {log.adminName}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                style={{
                  background: '#1FA855',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lock / Unlock Confirmation Modal */}
      {actionTarget && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActionTarget(null)}
        >
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '24px',
              width: '100%',
              maxWidth: '440px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 style={{ margin: '0 0 10px', fontSize: '17px', color: '#101828' }}>
              {actionTarget.nextStatus === 'SUSPENDED' ? 'Khóa Tài Khoản Người Dùng' : 'Kích Hoạt Lại Tài Khoản'}
            </h4>
            <p style={{ fontSize: '13px', color: '#667085', margin: '0 0 14px' }}>
              Người dùng: <strong>{actionTarget.user.fullName}</strong> ({actionTarget.user.email})
            </p>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                Lý do thay đổi trạng thái:
              </label>
              <textarea
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid #D0D5DD',
                  fontSize: '13px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setActionTarget(null)}
                style={{
                  background: '#F2F4F7',
                  color: '#344054',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmStatus}
                disabled={isUpdatingStatus}
                style={{
                  background: actionTarget.nextStatus === 'SUSPENDED' ? '#D92D20' : '#1FA855',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                {isUpdatingStatus ? 'Đang lưu...' : 'Xác nhận'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
