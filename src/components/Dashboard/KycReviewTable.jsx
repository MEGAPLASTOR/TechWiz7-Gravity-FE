import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Eye, ShieldCheck, FileText, MapPin, Phone, Mail } from 'lucide-react';

export default function KycReviewTable({ 
  kycList = [], 
  onKycReview, 
  onViewDetail,
  isLoading = false,
  t 
}) {
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);
  const [actionType, setActionType] = useState(null); // 'APPROVE' | 'REJECT' | 'REQUEST_REVISION'
  const [reviewReason, setReviewReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenActionModal = (farmerId, type) => {
    setSelectedFarmerId(farmerId);
    setActionType(type);
    setReviewReason(
      type === 'APPROVE' 
        ? 'Hồ sơ giấy tờ hợp lệ, chứng nhận VietGAP/hữu cơ còn hiệu lực.' 
        : type === 'REQUEST_REVISION'
        ? 'Cần bổ sung ảnh chụp rõ nét hơn hoặc cập nhật giấy chứng nhận mới.'
        : 'Hồ sơ không đáp ứng tiêu chuẩn an toàn hoặc phát hiện thông tin không chính xác.'
    );
  };

  const handleConfirmAction = async () => {
    if (!selectedFarmerId || !actionType) return;
    setIsSubmitting(true);
    try {
      await onKycReview(selectedFarmerId, { action: actionType, reason: reviewReason });
      setSelectedFarmerId(null);
      setActionType(null);
      setReviewReason('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pendingCount = kycList.filter(k => (k.kycStatus || k.status) === 'PENDING' || (k.kycStatus || k.status) === 'pending').length;

  return (
    <div 
      className="clay-card"
      style={{ padding: '24px', borderRadius: '28px', background: '#ffffff' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '18px', color: '#101828', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="#2563EB" />
            {t?.kycAdminHeading || 'Thẩm Định Định Danh Nông Dân (Farmer KYC)'}
          </h3>
          <p style={{ fontSize: '13px', color: '#667085', margin: '4px 0 0' }}>
            {t?.kycAdminSub || 'Kiểm duyệt hồ sơ chứng chỉ VietGAP/Hữu cơ và kích hoạt quyền mở sạp bán hàng'}
          </p>
        </div>
        <span 
          style={{
            background: pendingCount > 0 ? '#EFF8FF' : '#F2F4F7',
            color: pendingCount > 0 ? '#2563EB' : '#475467',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: '700'
          }}
        >
          {pendingCount} hồ sơ chờ duyệt
        </span>
      </div>

      {isLoading ? (
        <div style={{ padding: '36px', textAlign: 'center', color: '#667085', fontSize: '14px' }}>
          Đang tải danh sách hồ sơ từ hệ thống API...
        </div>
      ) : kycList.length === 0 ? (
        <div style={{ padding: '40px 20px', textAlign: 'center', background: '#F9FAFB', borderRadius: '20px', border: '1px dashed #D0D5DD' }}>
          <ShieldCheck size={36} color="#1FA855" style={{ margin: '0 auto 10px' }} />
          <div style={{ fontWeight: 700, color: '#101828', fontSize: '15px' }}>
            Không có hồ sơ nào đang chờ duyệt
          </div>
          <p style={{ fontSize: '13px', color: '#667085', margin: '6px 0 0' }}>
            Tất cả hồ sơ nông dân gửi lên đã được xử lý hoặc chưa có hồ sơ mới từ hệ thống API.
          </p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E4E7EC' }}>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: '#475467' }}>Nông Dân / Nhà Vườn</th>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: '#475467' }}>Liên Hệ</th>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: '#475467' }}>Trang Trại / Địa Chỉ</th>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: '#475467' }}>Tài Liệu</th>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: '#475467' }}>Trạng Thái</th>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: '#475467' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {kycList.map((item) => {
                const farmerId = item.farmerId || item.id;
                const name = item.fullName || item.farmerName || 'Nông Dân';
                const status = (item.kycStatus || item.status || 'PENDING').toUpperCase();
                const docCount = item.documentCount ?? (item.documents?.length || 1);

                return (
                  <tr key={farmerId} style={{ borderBottom: '1px solid #F2F4F7' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: '700', color: '#101828' }}>{name}</div>
                      <div style={{ fontSize: '11px', color: '#1FA855', fontWeight: 600 }}>
                        {item.stallName || item.farmEntity || 'Nhà Vườn Liên Kết'}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#475467' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                        <Mail size={12} color="#667085" /> {item.email || 'Chưa cập nhật'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', marginTop: '2px' }}>
                        <Phone size={12} color="#667085" /> {item.phoneNumber || '—'}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#475467', maxWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                        <MapPin size={12} color="#667085" style={{ flexShrink: 0 }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.farmAddress || item.landArea || 'Cần Thơ'}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: '#F0FDF4',
                          color: '#15803d',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}
                      >
                        <FileText size={12} /> {docCount} tài liệu
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span 
                        style={{
                          background: status === 'VERIFIED' ? '#ECFDF3' : status === 'REJECTED' ? '#FEE4E2' : '#FFF4ED',
                          color: status === 'VERIFIED' ? '#027A48' : status === 'REJECTED' ? '#D92D20' : '#FF7A30',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}
                      >
                        {status === 'VERIFIED' ? 'Đã duyệt' : status === 'REJECTED' ? 'Từ chối' : 'Chờ duyệt'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {onViewDetail && (
                          <button
                            onClick={() => onViewDetail(farmerId)}
                            title="Xem chi tiết giấy tờ"
                            style={{
                              background: '#EFF8FF',
                              color: '#2563EB',
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
                            <Eye size={13} /> Xem
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenActionModal(farmerId, 'APPROVE')}
                          title="Phê duyệt mở sạp"
                          style={{
                            background: '#1FA855',
                            color: '#fff',
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
                          <CheckCircle2 size={13} /> Duyệt
                        </button>
                        <button
                          onClick={() => handleOpenActionModal(farmerId, 'REJECT')}
                          title="Từ chối hồ sơ"
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
                          <XCircle size={13} /> Từ chối
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Review Action */}
      {selectedFarmerId && actionType && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 110,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedFarmerId(null)}
        >
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '24px',
              width: '100%',
              maxWidth: '460px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 style={{ margin: '0 0 12px', fontSize: '17px', color: '#101828', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {actionType === 'APPROVE' ? (
                <>
                  <CheckCircle2 size={20} color="#1FA855" />
                  Xác nhận Phê Duyệt Hồ Sơ KYC
                </>
              ) : actionType === 'REQUEST_REVISION' ? (
                <>
                  <AlertCircle size={20} color="#FF7A30" />
                  Yêu Cầu Chỉnh Sửa Hồ Sơ KYC
                </>
              ) : (
                <>
                  <XCircle size={20} color="#D92D20" />
                  Từ Chối Hồ Sơ KYC Nông Dân
                </>
              )}
            </h4>
            <p style={{ fontSize: '13px', color: '#667085', margin: '0 0 14px' }}>
              Hành động này sẽ cập nhật trạng thái trong hệ thống và ghi nhận vào nhật ký kiểm duyệt (Audit Log).
            </p>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                Ghi chú / Lý do kiểm duyệt:
              </label>
              <textarea
                value={reviewReason}
                onChange={(e) => setReviewReason(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #D0D5DD',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setSelectedFarmerId(null)}
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
                onClick={handleConfirmAction}
                disabled={isSubmitting}
                style={{
                  background: actionType === 'APPROVE' ? '#1FA855' : actionType === 'REQUEST_REVISION' ? '#FF7A30' : '#D92D20',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                {isSubmitting ? 'Đang lưu...' : 'Xác nhận'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
