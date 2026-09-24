import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getMyProfile, updateProfile, changePassword } from '@/api/userApi';
import { getCustomerProfileSummary } from '@/api/rbacApi';
import CustomerFamilySection from '@/components/Dashboard/CustomerFamilySection';
import { 
  User, 
  Users,
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  ShoppingBag, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  Plus, 
  Lock, 
  QrCode, 
  Sparkles,
  Save,
  AlertCircle,
  Home,
  ArrowLeft
} from 'lucide-react';

export default function CustomerPortalPage({ lang = 'en', onOpenLogin }) {
  const { user, refreshUser } = useAuth();

  const [activeTab, setActiveTab] = useState('reservations'); // 'reservations' | 'profile' | 'favorites'
  const [profileSummary, setProfileSummary] = useState(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
    defaultAddress: user?.profileDetails?.defaultAddress || '',
    latitude: user?.profileDetails?.latitude || 10.029,
    longitude: user?.profileDetails?.longitude || 105.772,
  });
  const [profileMsg, setProfileMsg] = useState({ text: '', type: '' });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordMsg, setPasswordMsg] = useState({ text: '', type: '' });
  const [isChangingPass, setIsChangingPass] = useState(false);

  // Customer Reservations (Morning Pickup Passes & Pre-orders)
  const [reservations, setReservations] = useState(() => {
    try {
      const saved = localStorage.getItem('ml_customer_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal / Form Create or Edit Reservation
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [editingResId, setEditingResId] = useState(null);
  const [resForm, setResForm] = useState({
    marketName: '',
    stallName: '',
    farmerName: '',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTimeSlot: '07:00 - 07:30 AM',
    itemName: '',
    itemQuantity: 1,
    itemPrice: 0,
    note: '',
  });

  // Active QR View Modal
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Fetch summary and profile
  useEffect(() => {
    async function loadData() {
      setIsLoadingSummary(true);
      try {
        const res = await getCustomerProfileSummary();
        setProfileSummary(res);
      } catch {
        // Fallback for summary
      } finally {
        setIsLoadingSummary(false);
      }

      try {
        const prof = await getMyProfile();
        if (prof) {
          setProfileForm({
            fullName: prof.fullName || '',
            phoneNumber: prof.phoneNumber || '',
            defaultAddress: prof.profileDetails?.defaultAddress || '',
            latitude: prof.profileDetails?.latitude || 10.029,
            longitude: prof.profileDetails?.longitude || 105.772,
          });
        }
      } catch {
        // Fallback
      }
    }
    loadData();
  }, []);

  // Handler: Profile Update
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileMsg({ text: '', type: '' });
    try {
      await updateProfile(profileForm);
      setProfileMsg({ text: 'Customer profile updated successfully! ✓', type: 'success' });
      refreshUser();
    } catch (err) {
      setProfileMsg({ text: err.message || 'Failed to update profile', type: 'error' });
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Handler: Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({ text: 'Confirm password does not match.', type: 'error' });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordMsg({ text: 'New password must be at least 6 characters.', type: 'error' });
      return;
    }

    setIsChangingPass(true);
    setPasswordMsg({ text: '', type: '' });
    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setPasswordMsg({ text: 'Password updated successfully! ✓', type: 'success' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordMsg({ text: err.message || 'Current password is incorrect', type: 'error' });
    } finally {
      setIsChangingPass(false);
    }
  };

  // Handler: Cancel Reservation
  const handleDeleteReservation = (id) => {
    if (window.confirm(`Are you sure you want to cancel reservation ${id}?`)) {
      setReservations((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // CRUD Handler: Open Edit Reservation
  const handleOpenEditReservation = (res) => {
    setEditingResId(res.id);
    setResForm({
      marketName: res.marketName,
      stallName: res.stallName,
      farmerName: res.farmerName,
      pickupDate: res.pickupDate,
      pickupTimeSlot: res.pickupTimeSlot,
      itemName: res.items[0]?.name || 'Nông sản VietGAP',
      itemQuantity: res.items[0]?.quantity || 1,
      itemPrice: res.items[0]?.price || 30000,
      note: res.note || '',
    });
    setIsReservationModalOpen(true);
  };

  // CRUD Handler: Save Create or Update Reservation
  const handleSaveReservation = (e) => {
    e.preventDefault();
    if (editingResId) {
      // Update
      setReservations((prev) =>
        prev.map((r) => {
          if (r.id === editingResId) {
            return {
              ...r,
              marketName: resForm.marketName,
              pickupDate: resForm.pickupDate,
              pickupTimeSlot: resForm.pickupTimeSlot,
              note: resForm.note,
              items: [
                {
                  name: resForm.itemName,
                  quantity: Number(resForm.itemQuantity),
                  unit: 'kg/bó',
                  price: Number(resForm.itemPrice),
                },
              ],
              totalAmount: Number(resForm.itemQuantity) * Number(resForm.itemPrice),
            };
          }
          return r;
        })
      );
    } else {
      // Create
      const newId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRes = {
        id: newId,
        marketName: resForm.marketName,
        stallName: resForm.stallName,
        farmerName: resForm.farmerName,
        pickupDate: resForm.pickupDate,
        pickupTimeSlot: resForm.pickupTimeSlot,
        items: [
          {
            name: resForm.itemName,
            quantity: Number(resForm.itemQuantity),
            unit: 'kg/bó',
            price: Number(resForm.itemPrice),
          },
        ],
        totalAmount: Number(resForm.itemQuantity) * Number(resForm.itemPrice),
        status: 'CONFIRMED',
        pickupCode: `ML-${Math.floor(1000 + Math.random() * 9000)}-PK`,
        note: resForm.note,
      };
      setReservations([newRes, ...reservations]);
    }
    setIsReservationModalOpen(false);
    setEditingResId(null);
  };

  return (
    <div style={{ background: '#F8FBF9', minHeight: 'calc(100vh - 68px)', padding: '24px 0 64px' }}>
      <div className="container">
        {/* Navigation Breadcrumb back to storefront */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '20px', 
            flexWrap: 'wrap', 
            gap: '12px' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#667085' }}>
            <Link 
              to="/" 
              style={{ 
                color: '#1FA855', 
                textDecoration: 'none', 
                fontWeight: 700, 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '5px' 
              }}
            >
              <Home size={16} /> Storefront
            </Link>
            <span>/</span>
            <span style={{ color: '#101828', fontWeight: 600 }}>Customer Hub</span>
          </div>

          <Link 
            to="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontSize: '13px', 
              fontWeight: 700, 
              color: '#1FA855', 
              textDecoration: 'none', 
              background: '#ffffff', 
              padding: '6px 14px', 
              borderRadius: '10px', 
              border: '1px solid rgba(31,168,85,0.25)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            <ArrowLeft size={14} /> Back to Storefront
          </Link>
        </div>

        {/* Customer Header Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #103F27 0%, #1FA855 100%)',
            borderRadius: '28px',
            padding: '32px 36px',
            color: '#ffffff',
            boxShadow: '0 12px 32px rgba(31,168,85,0.22)',
            marginBottom: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: '#ffffff',
                color: '#166534',
                fontSize: '24px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              }}
            >
              {user?.fullName ? user.fullName.slice(0, 2).toUpperCase() : 'CU'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    padding: '3px 12px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  🛒 CUSTOMER HUB
                </span>
                <span style={{ fontSize: '13px', opacity: 0.9 }}>
                  Customer ID: #{user?.userId || '102'}
                </span>
              </div>
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800 }}>
                Welcome, {user?.fullName || 'Valued Shopper'}!
              </h1>
              <p style={{ margin: '6px 0 0', fontSize: '14px', opacity: 0.85, maxWidth: '600px' }}>
                {profileSummary?.message || 'Manage morning market pickup slots, electronic passes, and verified delivery contact info.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '18px',
                padding: '14px 20px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '22px', fontWeight: 800 }}>{reservations.length}</div>
              <div style={{ fontSize: '11px', opacity: 0.9 }}>Active Orders</div>
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '18px',
                padding: '14px 20px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '22px', fontWeight: 800 }}>0đ</div>
              <div style={{ fontSize: '11px', opacity: 0.9 }}>Platform Fee</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            borderBottom: '2px solid rgba(31,168,85,0.15)',
            paddingBottom: '12px',
          }}
        >
          <button
            onClick={() => setActiveTab('reservations')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'reservations' ? '#1FA855' : '#ffffff',
              color: activeTab === 'reservations' ? '#ffffff' : '#475467',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'reservations' ? '0 4px 12px rgba(31,168,85,0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <ShoppingBag size={18} />
            <span>My Reservations & Pickup Passes</span>
            <span
              style={{
                background: activeTab === 'reservations' ? '#ffffff' : '#F2F4F7',
                color: activeTab === 'reservations' ? '#1FA855' : '#475467',
                borderRadius: '999px',
                padding: '2px 8px',
                fontSize: '11px',
              }}
            >
              {reservations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('family')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'family' ? '#1FA855' : '#ffffff',
              color: activeTab === 'family' ? '#ffffff' : '#475467',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'family' ? '0 4px 12px rgba(31,168,85,0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <Users size={18} />
            <span>Tài Khoản Gia Đình (Family)</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'profile' ? '#1FA855' : '#ffffff',
              color: activeTab === 'profile' ? '#ffffff' : '#475467',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'profile' ? '0 4px 12px rgba(31,168,85,0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <User size={18} />
            <span>Profile & Delivery Address</span>
          </button>
        </div>

        {/* TAB 1: RESERVATIONS */}
        {activeTab === 'reservations' && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', color: '#101828' }}>
                  Reserved Morning Harvest Orders
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#667085' }}>
                  Review your pickup slots, display your electronic verification pass, or modify before the daily 21:00 cutoff.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingResId(null);
                  setResForm({
                    marketName: 'Can Tho Central Hub (Ninh Kieu)',
                    stallName: 'Uncle Ba Phi Clean Farm (Stall A12)',
                    farmerName: 'Ba Phi (VietGAP)',
                    pickupDate: '2026-09-28',
                    pickupTimeSlot: '07:30 - 08:00 AM',
                    itemName: 'Fresh VietGAP Broccoli',
                    itemQuantity: 1,
                    itemPrice: 45000,
                    note: '',
                  });
                  setIsReservationModalOpen(true);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #1FA855 0%, #166534 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(31,168,85,0.25)',
                }}
              >
                <Plus size={18} />
                <span>Reserve Pickup Slot</span>
              </button>
            </div>

            {reservations.length === 0 ? (
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '48px',
                  textAlign: 'center',
                  border: '1.5px dashed #D0D5DD',
                }}
              >
                <ShoppingBag size={48} color="#98A2B3" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px', color: '#344054', margin: '0 0 6px' }}>
                  No reservations placed yet
                </h4>
                <p style={{ fontSize: '14px', color: '#667085', margin: '0 0 20px' }}>
                  Explore verified seasonal harvests directly from local family orchards and secure your morning pickup slot!
                </p>
                <a
                  href="/#catalog"
                  style={{
                    display: 'inline-block',
                    background: '#1FA855',
                    color: '#fff',
                    padding: '10px 24px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  Explore Marketplace Catalog →
                </a>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reservations.map((res) => (
                  <div
                    key={res.id}
                    style={{
                      background: '#ffffff',
                      borderRadius: '20px',
                      border: '1.5px solid rgba(31,168,85,0.18)',
                      padding: '24px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '20px',
                    }}
                  >
                    <div style={{ flex: '1 1 320px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span
                          style={{
                            background: '#F0FDF4',
                            color: '#166534',
                            padding: '3px 10px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 800,
                          }}
                        >
                          {res.id}
                        </span>
                        <span
                          style={{
                            background: res.status === 'READY_FOR_PICKUP' ? '#FFF4ED' : '#EFF8FF',
                            color: res.status === 'READY_FOR_PICKUP' ? '#FF7A30' : '#2563EB',
                            padding: '3px 10px',
                            borderRadius: '999px',
                            fontSize: '11px',
                            fontWeight: 700,
                          }}
                        >
                          {res.status === 'READY_FOR_PICKUP' ? '⚡ Ready for Counter Pickup' : '✓ Slot Confirmed'}
                        </span>
                      </div>

                      <div style={{ fontSize: '17px', fontWeight: 800, color: '#101828', marginBottom: '4px' }}>
                        {res.marketName}
                      </div>

                      <div style={{ fontSize: '13px', color: '#166534', fontWeight: 700, marginBottom: '8px' }}>
                        {res.stallName} • Grower: {res.farmerName}
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: '#475467' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Calendar size={14} color="#1FA855" />
                          {res.pickupDate}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Clock size={14} color="#FF7A30" />
                          {res.pickupTimeSlot}
                        </span>
                      </div>

                      {/* Items */}
                      <div
                        style={{
                          background: '#F9FAFB',
                          borderRadius: '12px',
                          padding: '10px 14px',
                          marginTop: '12px',
                        }}
                      >
                        {res.items.map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontSize: '13px',
                              color: '#344054',
                            }}
                          >
                            <span>
                              <strong>{item.quantity}x</strong> {item.name}
                            </span>
                            <span style={{ fontWeight: 700 }}>
                              {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                            </span>
                          </div>
                        ))}
                        {res.note && (
                          <div style={{ fontSize: '11px', color: '#667085', marginTop: '4px', fontStyle: 'italic' }}>
                            Special request: "{res.note}"
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions and QR Code */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: '12px',
                        borderLeft: '1px solid #EAECF0',
                        paddingLeft: '20px',
                        flex: '0 0 auto',
                      }}
                    >
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', color: '#667085' }}>Total Due at Stall:</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#166534' }}>
                          {res.totalAmount.toLocaleString('vi-VN')} đ
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => setSelectedTicket(res)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#1FA855',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '8px 14px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          <QrCode size={15} />
                          <span>Pickup Pass</span>
                        </button>

                        <button
                          onClick={() => handleOpenEditReservation(res)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: '#F2F4F7',
                            color: '#344054',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '8px 12px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          <Edit3 size={14} />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteReservation(res.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: '#FEF3F2',
                            color: '#D92D20',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '8px 12px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          <Trash2 size={14} />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: FAMILY ACCOUNT */}
        {activeTab === 'family' && (
          <CustomerFamilySection />
        )}

        {/* TAB 2: PROFILE & PREFERRED PICKUP ADDRESS */}
        {activeTab === 'profile' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
            {/* Form Update Profile */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '28px',
                border: '1.5px solid rgba(31,168,85,0.18)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <User size={20} color="#1FA855" />
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#101828' }}>
                  Personal Information & Contact Details
                </h3>
              </div>

              {profileMsg.text && (
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: profileMsg.type === 'success' ? '#F0FDF4' : '#FEF3F2',
                    color: profileMsg.type === 'success' ? '#166534' : '#D92D20',
                    border: `1px solid ${profileMsg.type === 'success' ? '#86efac' : '#fca5a5'}`,
                  }}
                >
                  {profileMsg.text}
                </div>
              )}

              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={profileForm.phoneNumber}
                    onChange={(e) => setProfileForm({ ...profileForm, phoneNumber: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                    Default Delivery / Local Address
                  </label>
                  <input
                    type="text"
                    value={profileForm.defaultAddress}
                    onChange={(e) => setProfileForm({ ...profileForm, defaultAddress: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#667085', marginBottom: '4px' }}>
                      GPS Latitude
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={profileForm.latitude}
                      onChange={(e) => setProfileForm({ ...profileForm, latitude: parseFloat(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: '1.5px solid #D0D5DD',
                        fontSize: '13px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#667085', marginBottom: '4px' }}>
                      GPS Longitude
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={profileForm.longitude}
                      onChange={(e) => setProfileForm({ ...profileForm, longitude: parseFloat(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: '1.5px solid #D0D5DD',
                        fontSize: '13px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSavingProfile}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#1FA855',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '8px',
                  }}
                >
                  <Save size={16} />
                  <span>{isSavingProfile ? 'Saving Changes...' : 'Save Profile Changes'}</span>
                </button>
              </form>
            </div>

            {/* Form Change Password */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '28px',
                border: '1.5px solid rgba(31,168,85,0.18)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Lock size={20} color="#FF7A30" />
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#101828' }}>
                  Account Security & Password
                </h3>
              </div>

              {passwordMsg.text && (
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: passwordMsg.type === 'success' ? '#F0FDF4' : '#FEF3F2',
                    color: passwordMsg.type === 'success' ? '#166534' : '#D92D20',
                    border: `1px solid ${passwordMsg.type === 'success' ? '#86efac' : '#fca5a5'}`,
                  }}
                >
                  {passwordMsg.text}
                </div>
              )}

              <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 6 characters"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Repeat new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isChangingPass}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#FF7A30',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '8px',
                  }}
                >
                  <Lock size={16} />
                  <span>{isChangingPass ? 'Updating Password...' : 'Update Password'}</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: CREATE OR EDIT RESERVATION */}
      {isReservationModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(16, 24, 40, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={() => setIsReservationModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#101828' }}>
                {editingResId ? `Reschedule Pickup #${editingResId}` : 'Schedule Morning Harvest Pickup'}
              </h3>
              <button
                onClick={() => setIsReservationModalOpen(false)}
                style={{
                  background: '#F2F4F7',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveReservation} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '4px' }}>
                  Designated Market Hub
                </label>
                <select
                  value={resForm.marketName}
                  onChange={(e) => setResForm({ ...resForm, marketName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #D0D5DD',
                    fontSize: '14px',
                  }}
                >
                  <option value="Can Tho Central Hub (Ninh Kieu)">Can Tho Central Hub (Ninh Kieu)</option>
                  <option value="Cai Rang Clean Agriculture Hub">Cai Rang Clean Agriculture Hub</option>
                  <option value="O Mon Organic Produce Cooperative">O Mon Organic Produce Cooperative</option>
                  <option value="Binh Thuy Community Farm Counter">Binh Thuy Community Farm Counter</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '4px' }}>
                  Selected Farm Item
                </label>
                <input
                  type="text"
                  required
                  value={resForm.itemName}
                  onChange={(e) => setResForm({ ...resForm, itemName: e.target.value })}
                  placeholder="e.g., VietGAP Hydroponic Kale, Sweet Melon..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #D0D5DD',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '4px' }}>
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={resForm.itemQuantity}
                    onChange={(e) => setResForm({ ...resForm, itemQuantity: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '4px' }}>
                    Estimated Unit Price (VND)
                  </label>
                  <input
                    type="number"
                    step="1000"
                    required
                    value={resForm.itemPrice}
                    onChange={(e) => setResForm({ ...resForm, itemPrice: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '4px' }}>
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    required
                    value={resForm.pickupDate}
                    onChange={(e) => setResForm({ ...resForm, pickupDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '4px' }}>
                    Pickup Time Window
                  </label>
                  <select
                    value={resForm.pickupTimeSlot}
                    onChange={(e) => setResForm({ ...resForm, pickupTimeSlot: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                    }}
                  >
                    <option value="06:30 - 07:00 AM">06:30 - 07:00 AM</option>
                    <option value="07:00 - 07:30 AM">07:00 - 07:30 AM</option>
                    <option value="07:30 - 08:00 AM">07:30 - 08:00 AM</option>
                    <option value="08:00 - 08:30 AM">08:00 - 08:30 AM</option>
                    <option value="08:30 - 09:00 AM">08:30 - 09:00 AM</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '4px' }}>
                  Grower Note
                </label>
                <input
                  type="text"
                  placeholder="e.g., Early morning batch, wrap in banana leaves..."
                  value={resForm.note}
                  onChange={(e) => setResForm({ ...resForm, note: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #D0D5DD',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsReservationModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '12px',
                    border: '1.5px solid #D0D5DD',
                    background: '#ffffff',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 22px',
                    borderRadius: '12px',
                    border: 'none',
                    background: '#1FA855',
                    color: '#fff',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  {editingResId ? 'Save Changes' : 'Confirm Reservation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ELECTRONIC PICKUP TICKET QR */}
      {selectedTicket && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(16, 24, 40, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={() => setSelectedTicket(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '380px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                background: '#EAF4EC',
                color: '#166534',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 800,
                display: 'inline-block',
                marginBottom: '12px',
              }}
            >
              DIGITAL PICKUP PASS
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', color: '#101828' }}>
              {selectedTicket.marketName}
            </h3>
            <p style={{ fontSize: '13px', color: '#667085', margin: '0 0 16px' }}>
              Present this pass at <strong>{selectedTicket.stallName}</strong>
            </p>

            {/* QR Simulation Box */}
            <div
              style={{
                width: '180px',
                height: '180px',
                margin: '0 auto 16px',
                background: '#F8FBF9',
                border: '2px solid #1FA855',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
              }}
            >
              <QrCode size={110} color="#103F27" />
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#103F27', marginTop: '6px' }}>
                {selectedTicket.pickupCode}
              </div>
            </div>

            <div style={{ background: '#F2F4F7', borderRadius: '12px', padding: '12px', marginBottom: '20px', fontSize: '13px', textAlign: 'left' }}>
              <div>📅 Pickup Date: <strong>{selectedTicket.pickupDate}</strong></div>
              <div>⏰ Pickup Slot: <strong>{selectedTicket.pickupTimeSlot}</strong></div>
              <div>💰 Settle at Counter: <strong>{selectedTicket.totalAmount.toLocaleString('vi-VN')} đ</strong></div>
            </div>

            <button
              onClick={() => setSelectedTicket(null)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                background: '#1FA855',
                color: '#fff',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
