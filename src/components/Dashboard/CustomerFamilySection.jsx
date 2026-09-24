import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Trash2, 
  LogOut, 
  Check, 
  X, 
  Clock, 
  ShieldCheck, 
  Copy, 
  CheckCheck 
} from 'lucide-react';
import { 
  getFamilyMembers, 
  getMyInvitations, 
  inviteFamilyMember, 
  acceptFamilyInvitation, 
  rejectFamilyInvitation, 
  removeFamilyMember, 
  leaveFamily 
} from '@/api/familyApi';

export default function CustomerFamilySection() {
  const [members, setMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState({ text: '', type: '' });

  // Invite Form
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  // Accept token form
  const [inputToken, setInputToken] = useState('');
  const [isAcceptingToken, setIsAcceptingToken] = useState(false);
  const [copiedToken, setCopiedToken] = useState(null);

  const loadFamilyData = async () => {
    setIsLoading(true);
    try {
      const [membersRes, invitesRes] = await Promise.allSettled([
        getFamilyMembers(),
        getMyInvitations()
      ]);

      if (membersRes.status === 'fulfilled') {
        const d = membersRes.value?.data || membersRes.value;
        setMembers(Array.isArray(d) ? d : []);
      }
      if (invitesRes.status === 'fulfilled') {
        const d = invitesRes.value?.data || invitesRes.value;
        setInvitations(Array.isArray(d) ? d : []);
      }
    } catch {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFamilyData();
  }, []);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setIsInviting(true);
    setToastMsg({ text: '', type: '' });
    try {
      await inviteFamilyMember(inviteEmail.trim());
      setToastMsg({ text: `Đã gửi lời mời tới ${inviteEmail}! Mã mời có hiệu lực trong 7 ngày.`, type: 'success' });
      setInviteEmail('');
      loadFamilyData();
    } catch (err) {
      setToastMsg({ text: err.message || 'Không thể gửi lời mời.', type: 'error' });
    } finally {
      setIsInviting(false);
    }
  };

  const handleAcceptInvite = async (token) => {
    try {
      await acceptFamilyInvitation(token);
      setToastMsg({ text: 'Đã chấp nhận lời mời gia đình thành công!', type: 'success' });
      loadFamilyData();
    } catch (err) {
      setToastMsg({ text: err.message || 'Không thể chấp nhận lời mời.', type: 'error' });
    }
  };

  const handleRejectInvite = async (token) => {
    try {
      await rejectFamilyInvitation(token);
      setToastMsg({ text: 'Đã từ chối lời mời gia đình.', type: 'success' });
      loadFamilyData();
    } catch (err) {
      setToastMsg({ text: err.message || 'Thao tác không thành công.', type: 'error' });
    }
  };

  const handleAcceptManualToken = async (e) => {
    e.preventDefault();
    if (!inputToken.trim()) return;
    setIsAcceptingToken(true);
    try {
      await acceptFamilyInvitation(inputToken.trim());
      setToastMsg({ text: 'Gia nhập nhóm gia đình thành công!', type: 'success' });
      setInputToken('');
      loadFamilyData();
    } catch (err) {
      setToastMsg({ text: err.message || 'Token không hợp lệ hoặc đã hết hạn.', type: 'error' });
    } finally {
      setIsAcceptingToken(false);
    }
  };

  const handleRemoveMember = async (memberId, memberName) => {
    if (window.confirm(`Bạn có chắc muốn xóa thành viên ${memberName} khỏi nhóm gia đình?`)) {
      try {
        await removeFamilyMember(memberId);
        setToastMsg({ text: `Đã xóa ${memberName} khỏi nhóm gia đình.`, type: 'success' });
        loadFamilyData();
      } catch (err) {
        setToastMsg({ text: err.message || 'Không thể xóa thành viên.', type: 'error' });
      }
    }
  };

  const handleLeaveFamily = async () => {
    if (window.confirm('Bạn có chắc muốn rời khỏi nhóm gia đình hiện tại?')) {
      try {
        await leaveFamily();
        setToastMsg({ text: 'Đã rời khỏi nhóm gia đình.', type: 'success' });
        loadFamilyData();
      } catch (err) {
        setToastMsg({ text: err.message || 'Thao tác không thành công.', type: 'error' });
      }
    }
  };

  const handleCopy = (token) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div 
      className="clay-card"
      style={{ padding: '24px', borderRadius: '28px', background: '#ffffff' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '18px', color: '#101828', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={22} color="#1FA855" />
            Tài Khoản Gia Đình (Family Account)
          </h3>
          <p style={{ fontSize: '13px', color: '#667085', margin: '4px 0 0' }}>
            Liên kết các thành viên trong gia đình để cùng gom đơn đặt trước nông sản và cùng nhận hàng
          </p>
        </div>

        {members.length > 1 && (
          <button
            onClick={handleLeaveFamily}
            style={{
              background: '#FEE4E2',
              color: '#D92D20',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <LogOut size={14} /> Rời nhóm gia đình
          </button>
        )}
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

      {/* Invite Member Box */}
      <div style={{
        background: '#F9FAFB',
        border: '1px solid #EAECF0',
        borderRadius: '16px',
        padding: '18px',
        marginBottom: '24px'
      }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#101828', marginBottom: '8px' }}>
          Mời thành viên gia đình
        </div>
        <form onSubmit={handleInvite} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="email"
            placeholder="Nhập email người thân (ví dụ: wife@marketlink.com)"
            required
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            style={{
              flex: '1 1 260px',
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid #D0D5DD',
              fontSize: '13px'
            }}
          />
          <button
            type="submit"
            disabled={isInviting}
            style={{
              background: '#1FA855',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <UserPlus size={16} />
            {isInviting ? 'Đang gửi...' : 'Gửi Lời Mời'}
          </button>
        </form>

        {/* Enter Invitation Token Directly */}
        <form onSubmit={handleAcceptManualToken} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed #E4E7EC' }}>
          <input
            type="text"
            placeholder="Hoặc dán mã Token lời mời nhận được (UUID)..."
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            style={{
              flex: '1 1 260px',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #D0D5DD',
              fontSize: '12px'
            }}
          />
          <button
            type="submit"
            disabled={isAcceptingToken}
            style={{
              background: '#EFF8FF',
              color: '#2563EB',
              border: '1px solid rgba(37,99,235,0.2)',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {isAcceptingToken ? 'Đang tham gia...' : 'Nhập Token Tham Gia'}
          </button>
        </form>
      </div>

      {/* Members Grid */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '15px', color: '#101828', margin: '0 0 12px' }}>
          Thành Viên Trong Nhóm ({members.length})
        </h4>

        {members.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', background: '#F9FAFB', borderRadius: '14px', border: '1px dashed #D0D5DD' }}>
            <Users size={28} color="#98A2B3" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontWeight: 600, color: '#344054', fontSize: '13px' }}>
              Bạn chưa tham gia nhóm gia đình nào
            </div>
            <p style={{ fontSize: '12px', color: '#667085', margin: '4px 0 0' }}>
              Mời người thân hoặc nhập mã token để bắt đầu sử dụng chung danh sách đặt hàng.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
            {members.map((m) => (
              <div
                key={m.customerId}
                style={{
                  padding: '14px 16px',
                  borderRadius: '14px',
                  background: '#F9FAFB',
                  border: '1px solid #EAECF0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: '#101828', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {m.fullName}
                    {m.isHeadOfFamily && (
                      <span style={{ fontSize: '10px', background: '#EAF4EC', color: '#1FA855', padding: '2px 6px', borderRadius: '6px', fontWeight: 800 }}>
                        CHỦ NHÓM
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#667085', marginTop: '2px' }}>
                    {m.email}
                  </div>
                </div>

                {!m.isHeadOfFamily && (
                  <button
                    onClick={() => handleRemoveMember(m.customerId, m.fullName)}
                    title="Xóa thành viên"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#D92D20',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invitations List */}
      {invitations.length > 0 && (
        <div>
          <h4 style={{ fontSize: '15px', color: '#101828', margin: '0 0 12px' }}>
            Lời Mời Gia Đình ({invitations.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {invitations.map((inv) => (
              <div
                key={inv.invitationId}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: '#F9FAFB',
                  border: '1px solid #EAECF0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#101828' }}>
                    {inv.inviterName} mời <span style={{ color: '#2563EB' }}>{inv.inviteeEmail}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#667085', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>Token: <code>{inv.invitationToken?.slice(0, 16)}...</code></span>
                    <button
                      type="button"
                      onClick={() => handleCopy(inv.invitationToken)}
                      style={{ background: 'none', border: 'none', color: '#2563EB', cursor: 'pointer', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '2px' }}
                    >
                      {copiedToken === inv.invitationToken ? <CheckCheck size={12} color="#1FA855" /> : <Copy size={12} />}
                      Sao chép
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: inv.status === 'ACCEPTED' ? '#ECFDF3' : inv.status === 'REJECTED' ? '#FEE4E2' : '#FFF4ED',
                    color: inv.status === 'ACCEPTED' ? '#027A48' : inv.status === 'REJECTED' ? '#D92D20' : '#FF7A30'
                  }}>
                    {inv.status}
                  </span>

                  {inv.status === 'PENDING' && (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => handleAcceptInvite(inv.invitationToken)}
                        style={{
                          background: '#1FA855',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Đồng ý
                      </button>
                      <button
                        onClick={() => handleRejectInvite(inv.invitationToken)}
                        style={{
                          background: '#FEE4E2',
                          color: '#D92D20',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Từ chối
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
