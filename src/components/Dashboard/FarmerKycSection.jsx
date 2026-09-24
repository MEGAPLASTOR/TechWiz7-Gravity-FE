import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  UploadCloud, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText, 
  Clock, 
  Plus, 
  Trash2 
} from 'lucide-react';
import { getMyKycDocuments, submitFarmerKyc } from '@/api/farmerApi';

const DOC_TYPES = [
  { value: 'CITIZEN_ID_FRONT', label: 'Căn cước công dân (Mặt trước)' },
  { value: 'CITIZEN_ID_BACK', label: 'Căn cước công dân (Mặt sau)' },
  { value: 'ORGANIC_VIETGAP_CERT', label: 'Chứng nhận VietGAP / Hữu cơ (Khuyên dùng)' },
  { value: 'BUSINESS_REGISTRATION', label: 'Giấy phép kinh doanh / HTX' },
  { value: 'FOOD_SAFETY_CERT', label: 'Giấy chứng nhận An toàn thực phẩm' },
  { value: 'FARM_PHOTO', label: 'Hình ảnh thực tế trang trại / vườn rau' },
];

export default function FarmerKycSection() {
  const [kycData, setKycData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState({ text: '', type: '' });

  // Document upload form
  const [documents, setDocuments] = useState([
    {
      documentType: 'CITIZEN_ID_FRONT',
      documentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
      documentNumber: '',
      issuedDate: '',
      expiryDate: '',
    },
    {
      documentType: 'ORGANIC_VIETGAP_CERT',
      documentUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
      documentNumber: '',
      issuedDate: '',
      expiryDate: '',
    }
  ]);

  const loadKyc = async () => {
    setIsLoading(true);
    try {
      const res = await getMyKycDocuments();
      // res schema: ApiResponseFarmerKycStatusResponse -> res.data or res
      setKycData(res?.data || res);
    } catch {
      // User might be unverified yet
      setKycData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadKyc();
  }, []);

  const handleAddDocumentRow = () => {
    setDocuments((prev) => [
      ...prev,
      {
        documentType: 'FARM_PHOTO',
        documentUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854',
        documentNumber: '',
        issuedDate: '',
        expiryDate: '',
      }
    ]);
  };

  const handleRemoveDocRow = (index) => {
    setDocuments((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleDocChange = (index, field, value) => {
    setDocuments((prev) =>
      prev.map((doc, idx) => (idx === index ? { ...doc, [field]: value } : doc))
    );
  };

  const handleSubmitKyc = async (e) => {
    e.preventDefault();
    if (documents.length === 0) {
      setToastMsg({ text: 'Vui lòng đính kèm ít nhất 1 tài liệu.', type: 'error' });
      return;
    }
    setIsSubmitting(true);
    setToastMsg({ text: '', type: '' });
    try {
      const res = await submitFarmerKyc({ documents });
      setToastMsg({ 
        text: 'Nộp hồ sơ định danh KYC thành công! Ban Quản Lý sẽ sớm thẩm định.', 
        type: 'success' 
      });
      setIsModalOpen(false);
      loadKyc();
    } catch (err) {
      setToastMsg({ text: err.message || 'Không thể gửi hồ sơ. Vui lòng thử lại.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const kycStatus = (kycData?.kycStatus || 'UNVERIFIED').toUpperCase();
  const isApproved = kycData?.isApproved || false;

  return (
    <div 
      className="clay-card"
      style={{ padding: '24px', borderRadius: '28px', background: '#ffffff' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '18px', color: '#101828', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={22} color="#1FA855" />
            Hồ Sơ Định Danh Nông Dân & Chứng Chỉ (Farmer KYC)
          </h3>
          <p style={{ fontSize: '13px', color: '#667085', margin: '4px 0 0' }}>
            Xác thực VietGAP/GlobalGAP để kích hoạt quyền mở sạp bán hàng và tạo lòng tin với khách hàng
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #1FA855, #166534)',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(31,168,85,0.2)'
          }}
        >
          <UploadCloud size={16} /> Nộp Hồ Sơ KYC
        </button>
      </div>

      {toastMsg.text && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '12px',
          marginBottom: '18px',
          fontSize: '13px',
          fontWeight: 600,
          background: toastMsg.type === 'success' ? '#ECFDF3' : '#FEE4E2',
          color: toastMsg.type === 'success' ? '#027A48' : '#D92D20',
          border: `1px solid ${toastMsg.type === 'success' ? '#A6F4C5' : '#FECDCA'}`
        }}>
          {toastMsg.text}
        </div>
      )}

      {/* KYC Status Summary Banner */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          marginBottom: '24px'
        }}
      >
        <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '16px', border: '1px solid #EAECF0' }}>
          <div style={{ fontSize: '11px', color: '#667085', fontWeight: 700, textTransform: 'uppercase' }}>
            Trạng Thái Hồ Sơ
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            <span 
              style={{
                background: kycStatus === 'VERIFIED' ? '#ECFDF3' : kycStatus === 'PENDING' ? '#FFF4ED' : '#F2F4F7',
                color: kycStatus === 'VERIFIED' ? '#027A48' : kycStatus === 'PENDING' ? '#FF7A30' : '#475467',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 800
              }}
            >
              {kycStatus === 'VERIFIED' ? 'ĐÃ XÁC MINH' : kycStatus === 'PENDING' ? 'CHỜ XÉT DUYỆT' : kycStatus === 'REJECTED' ? 'TỪ CHỐI' : 'CHƯA NỘP HỒ SƠ'}
            </span>
          </div>
        </div>

        <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '16px', border: '1px solid #EAECF0' }}>
          <div style={{ fontSize: '11px', color: '#667085', fontWeight: 700, textTransform: 'uppercase' }}>
            Quyền Bán Hàng Tại Chợ
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            {isApproved ? (
              <span style={{ color: '#1FA855', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={16} /> Đã Kích Hoạt Quyền Mở Sạp
              </span>
            ) : (
              <span style={{ color: '#FF7A30', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={16} /> Cần duyệt KYC trước khi bán
              </span>
            )}
          </div>
        </div>

        <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '16px', border: '1px solid #EAECF0' }}>
          <div style={{ fontSize: '11px', color: '#667085', fontWeight: 700, textTransform: 'uppercase' }}>
            Tài Liệu Đã Nộp
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#101828', marginTop: '4px' }}>
            {kycData?.documents?.length || 0} tài liệu
          </div>
        </div>
      </div>

      {/* Latest Admin Remark if any */}
      {kycData?.latestRemark && (
        <div style={{
          background: '#FFF4ED',
          border: '1.5px solid #FF7A30',
          borderRadius: '16px',
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <AlertCircle size={20} color="#FF7A30" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#B54708' }}>
              Phản hồi từ Quản trị viên:
            </div>
            <div style={{ fontSize: '13px', color: '#7A2E0E', marginTop: '2px' }}>
              {kycData.latestRemark}
            </div>
          </div>
        </div>
      )}

      {/* Submitted Documents List */}
      <div>
        <h4 style={{ fontSize: '15px', color: '#101828', margin: '0 0 12px' }}>
          Danh Sách Giấy Tờ Đã Tải Lên ({kycData?.documents?.length || 0})
        </h4>

        {(!kycData?.documents || kycData.documents.length === 0) ? (
          <div style={{ padding: '28px', textAlign: 'center', background: '#F9FAFB', borderRadius: '16px', border: '1px dashed #D0D5DD' }}>
            <FileText size={32} color="#98A2B3" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 600, color: '#344054', fontSize: '13px' }}>
              Chưa có tài liệu nào được gửi
            </div>
            <p style={{ fontSize: '12px', color: '#667085', margin: '4px 0 0' }}>
              Nhấn "Nộp Hồ Sơ KYC" ở trên để gửi ảnh chụp CCCD và chứng nhận VietGAP.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {kycData.documents.map((doc) => {
              const matchedType = DOC_TYPES.find(d => d.value === doc.documentType);
              return (
                <div 
                  key={doc.documentId}
                  style={{
                    padding: '14px',
                    borderRadius: '14px',
                    border: '1px solid #EAECF0',
                    background: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={18} color="#1FA855" />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#101828' }}>
                      {matchedType?.label || doc.documentType}
                    </span>
                  </div>
                  {doc.documentNumber && (
                    <div style={{ fontSize: '12px', color: '#667085' }}>
                      Số hiệu: <strong>{doc.documentNumber}</strong>
                    </div>
                  )}
                  {doc.documentUrl && (
                    <a 
                      href={doc.documentUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '12px', color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}
                    >
                      Xem tài liệu đính kèm ↗
                    </a>
                  )}
                  <div style={{ fontSize: '11px', color: '#98A2B3' }}>
                    Ngày nộp: {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('vi-VN') : '—'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* KYC Submit Modal */}
      {isModalOpen && (
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
          onClick={() => setIsModalOpen(false)}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h4 style={{ margin: 0, fontSize: '18px', color: '#101828', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UploadCloud size={20} color="#1FA855" />
                Nộp Hồ Sơ Định Danh KYC Nông Dân
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#667085' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitKyc}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '18px' }}>
                {documents.map((doc, idx) => (
                  <div 
                    key={idx}
                    style={{
                      padding: '14px',
                      borderRadius: '14px',
                      background: '#F9FAFB',
                      border: '1px solid #EAECF0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#344054' }}>
                        Tài liệu #{idx + 1}
                      </span>
                      {documents.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveDocRow(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#D92D20',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Trash2 size={13} /> Xóa
                        </button>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475467', marginBottom: '4px' }}>
                          Loại giấy tờ
                        </label>
                        <select
                          value={doc.documentType}
                          onChange={(e) => handleDocChange(idx, 'documentType', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '12px' }}
                        >
                          {DOC_TYPES.map(t => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475467', marginBottom: '4px' }}>
                          Số hiệu / Mã chứng nhận
                        </label>
                        <input
                          type="text"
                          placeholder="Ví dụ: VG-2026/89..."
                          value={doc.documentNumber}
                          onChange={(e) => handleDocChange(idx, 'documentNumber', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '12px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#475467', marginBottom: '4px' }}>
                        Đường dẫn URL hình ảnh / tài liệu
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        required
                        value={doc.documentUrl}
                        onChange={(e) => handleDocChange(idx, 'documentUrl', e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D0D5DD', fontSize: '12px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handleAddDocumentRow}
                  style={{
                    background: '#F0FDF4',
                    color: '#15803d',
                    border: '1px solid rgba(31,168,85,0.3)',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Plus size={14} /> Thêm tài liệu khác
                </button>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      background: '#F2F4F7',
                      color: '#344054',
                      border: 'none',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      background: '#1FA855',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 22px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {isSubmitting ? 'Đang gửi...' : 'Nộp Hồ Sơ'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
