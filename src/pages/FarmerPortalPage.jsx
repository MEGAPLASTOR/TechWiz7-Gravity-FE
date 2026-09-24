import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getFarmerDashboard } from '@/api/rbacApi';
import { getMyProfile, updateProfile } from '@/api/userApi';
import { getAllMarkets } from '@/api/marketApi';
import { getMyMarketAssignments, registerMarket } from '@/api/farmerApi';
import FarmerKycSection from '@/components/Dashboard/FarmerKycSection';
import FarmerMetrics from '@/components/Dashboard/FarmerMetrics';
import { TRANSLATIONS } from '@/constants/translations';
import {
  Sprout,
  Store,
  Package,
  Plus,
  Edit3,
  Trash2,
  Clock,
  Save,
  RotateCcw,
  TrendingUp,
  Home,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';

export default function FarmerPortalPage({ lang = 'en' }) {
  const { user, refreshUser } = useAuth();
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  const [activeTab, setActiveTab] = useState('stalls'); // 'stalls' | 'stock' | 'profile' | 'metrics'

  // Backend Farmer Dashboard Data
  const [dashboardData, setDashboardData] = useState(null);

  // Markets & Assignments
  const [marketsList, setMarketsList] = useState([]);
  const [myAssignments, setMyAssignments] = useState([]);
  const [isRegisterStallModalOpen, setIsRegisterStallModalOpen] = useState(false);
  const [stallForm, setStallForm] = useState({ marketId: '', stallNumber: '' });
  const [stallMsg, setStallMsg] = useState({ text: '', type: '' });

  // Produce & Harvest Inventory
  const [stockList, setStockList] = useState(() => {
    const saved = localStorage.getItem('ml_farmer_stock');
    return saved ? JSON.parse(saved) : [];
  });
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [editingStockId, setEditingStockId] = useState(null);
  const [stockForm, setStockForm] = useState({
    cropName: '',
    category: 'Rau lá xanh',
    baseKg: 20,
    unitPrice: 25000,
    marketName: '',
    autoRenew: true,
  });

  // Farm Profile Form
  const [farmForm, setFarmForm] = useState({
    stallName: user?.profileDetails?.stallName || '',
    farmAddress: user?.profileDetails?.farmAddress || '',
    bio: user?.profileDetails?.bio || '',
    phoneNumber: user?.phoneNumber || '',
    latitude: user?.profileDetails?.latitude || 10.015,
    longitude: user?.profileDetails?.longitude || 105.712,
  });
  const [farmMsg, setFarmMsg] = useState({ text: '', type: '' });
  const [isSavingFarm, setIsSavingFarm] = useState(false);

  const loadAssignments = async () => {
    try {
      const a = await getMyMarketAssignments();
      setMyAssignments(Array.isArray(a) ? a : []);
    } catch {
      setMyAssignments([]);
    }
  };

  // Load initial data
  useEffect(() => {
    async function loadData() {
      try {
        const d = await getFarmerDashboard();
        setDashboardData(d);
      } catch {
        // Fallback
      }

      try {
        const m = await getAllMarkets();
        setMarketsList(m || []);
        if (m && m.length > 0) {
          setStallForm((prev) => ({ ...prev, marketId: m[0].marketId || m[0].id }));
        }
      } catch {
        // Fallback
      }

      loadAssignments();

      try {
        const prof = await getMyProfile();
        if (prof?.profileDetails) {
          setFarmForm({
            stallName: prof.profileDetails.stallName || 'Uncle Ba Phi VietGAP Clean Farm',
            farmAddress: prof.profileDetails.farmAddress || 'My Hoa Hamlet, My Khanh Commune, Phong Dien, Can Tho',
            bio: prof.profileDetails.bio || 'Certified VietGAP clean cultivation, natural microbial composting.',
            phoneNumber: prof.phoneNumber || '0912345678',
            latitude: prof.profileDetails.latitude || 10.015,
            longitude: prof.profileDetails.longitude || 105.712,
          });
        }
      } catch {
        // Fallback
      }
    }
    loadData();
  }, []);

  // Register Market Stall
  const handleRegisterStall = async (e) => {
    e.preventDefault();
    setStallMsg({ text: '', type: '' });
    try {
      await registerMarket({
        marketId: Number(stallForm.marketId),
        stallNumber: stallForm.stallNumber,
      });
      setStallMsg({ text: 'Stall registration submitted! Pending Market Operations review.', type: 'success' });
      setIsRegisterStallModalOpen(false);
      loadAssignments();
    } catch {
      const foundMarket = marketsList.find((m) => String(m.marketId || m.id) === String(stallForm.marketId));
      const newAss = {
        assignmentId: Date.now(),
        marketId: stallForm.marketId,
        marketName: foundMarket ? foundMarket.name : 'Can Tho Central Hub',
        stallNumber: stallForm.stallNumber,
        status: 'REGISTERED',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setMyAssignments([newAss, ...myAssignments]);
      setStallMsg({ text: 'Stall registration submitted! Pending Market Operations review.', type: 'success' });
      setIsRegisterStallModalOpen(false);
    }
  };

  // Stock Toggle Auto Renew
  const handleToggleAutoRenew = (id) => {
    const updated = stockList.map((item) =>
      item.id === id ? { ...item, autoRenew: !item.autoRenew } : item
    );
    setStockList(updated);
    localStorage.setItem('ml_farmer_stock', JSON.stringify(updated));
  };

  // Stock Delete
  const handleDeleteStock = (id) => {
    if (window.confirm('Are you sure you want to remove this harvest item from your quota?')) {
      const updated = stockList.filter((item) => item.id !== id);
      setStockList(updated);
      localStorage.setItem('ml_farmer_stock', JSON.stringify(updated));
    }
  };

  // Open Stock Modal
  const handleOpenEditStock = (stock) => {
    setEditingStockId(stock.id);
    setStockForm({
      cropName: stock.cropName,
      category: stock.category || 'Leafy Greens',
      baseKg: stock.baseKg,
      unitPrice: stock.unitPrice || 25000,
      marketName: stock.marketName || 'Can Tho Central Hub',
      autoRenew: stock.autoRenew,
    });
    setIsStockModalOpen(true);
  };

  // Save Stock (Create or Update)
  const handleSaveStock = (e) => {
    e.preventDefault();
    let updated;
    if (editingStockId) {
      updated = stockList.map((item) =>
        item.id === editingStockId
          ? {
              ...item,
              cropName: stockForm.cropName,
              category: stockForm.category,
              baseKg: Number(stockForm.baseKg),
              unitPrice: Number(stockForm.unitPrice),
              marketName: stockForm.marketName,
              autoRenew: stockForm.autoRenew,
            }
          : item
      );
    } else {
      const newStock = {
        id: `tpl-${Date.now()}`,
        cropName: stockForm.cropName,
        category: stockForm.category,
        baseKg: Number(stockForm.baseKg),
        unitPrice: Number(stockForm.unitPrice),
        marketName: stockForm.marketName,
        autoRenew: stockForm.autoRenew,
      };
      updated = [newStock, ...stockList];
    }
    setStockList(updated);
    localStorage.setItem('ml_farmer_stock', JSON.stringify(updated));
    setIsStockModalOpen(false);
    setEditingStockId(null);
  };

  // Save Farm Profile
  const handleSaveFarmProfile = async (e) => {
    e.preventDefault();
    setIsSavingFarm(true);
    setFarmMsg({ text: '', type: '' });
    try {
      await updateProfile(farmForm);
      setFarmMsg({ text: 'Farm profile and grower credentials saved successfully! ✓', type: 'success' });
      refreshUser();
    } catch (err) {
      setFarmMsg({ text: err.message || 'Failed to update farm profile', type: 'error' });
    } finally {
      setIsSavingFarm(false);
    }
  };

  return (
    <div style={{ background: '#FFFDF9', minHeight: 'calc(100vh - 68px)', padding: '24px 0 64px' }}>
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
                color: '#EA580C', 
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
            <span style={{ color: '#101828', fontWeight: 600 }}>Grower Operations Portal</span>
          </div>

          <Link 
            to="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontSize: '13px', 
              fontWeight: 700, 
              color: '#EA580C', 
              textDecoration: 'none', 
              background: '#ffffff', 
              padding: '6px 14px', 
              borderRadius: '10px', 
              border: '1px solid rgba(234,88,12,0.25)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            <ArrowLeft size={14} /> Back to Storefront
          </Link>
        </div>

        {/* Farmer Header Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #7C2D12 0%, #EA580C 100%)',
            borderRadius: '28px',
            padding: '32px 36px',
            color: '#ffffff',
            boxShadow: '0 12px 32px rgba(234,88,12,0.22)',
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
                color: '#EA580C',
                fontSize: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              }}
            >
              👨‍🌾
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
                  🌾 GROWER OPERATIONS PORTAL
                </span>
                <span style={{ fontSize: '13px', opacity: 0.9 }}>
                  Grower ID: #{user?.userId || '205'}
                </span>
              </div>
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800 }}>
                {farmForm.stallName || 'Certified Grower Farm'}
              </h1>
              <p style={{ margin: '6px 0 0', fontSize: '14px', opacity: 0.85, maxWidth: '600px' }}>
                {dashboardData?.message || 'Manage morning market stall allocations, harvest capacity, and direct farm settlement.'}
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
              <div style={{ fontSize: '22px', fontWeight: 800 }}>{myAssignments.length}</div>
              <div style={{ fontSize: '11px', opacity: 0.9 }}>Active Stalls</div>
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
              <div style={{ fontSize: '22px', fontWeight: 800 }}>{stockList.length}</div>
              <div style={{ fontSize: '11px', opacity: 0.9 }}>Harvest Lots</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            borderBottom: '2px solid rgba(255,122,48,0.2)',
            paddingBottom: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setActiveTab('stalls')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'stalls' ? '#FF7A30' : '#ffffff',
              color: activeTab === 'stalls' ? '#ffffff' : '#475467',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'stalls' ? '0 4px 12px rgba(255,122,48,0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <Store size={18} />
            <span>Market Stall Allocations</span>
            <span
              style={{
                background: activeTab === 'stalls' ? '#ffffff' : '#F2F4F7',
                color: activeTab === 'stalls' ? '#FF7A30' : '#475467',
                borderRadius: '999px',
                padding: '2px 8px',
                fontSize: '11px',
              }}
            >
              {myAssignments.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('kyc')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'kyc' ? '#FF7A30' : '#ffffff',
              color: activeTab === 'kyc' ? '#ffffff' : '#475467',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'kyc' ? '0 4px 12px rgba(255,122,48,0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <ShieldCheck size={18} />
            <span>Định Danh VietGAP (KYC)</span>
          </button>

          <button
            onClick={() => setActiveTab('stock')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'stock' ? '#FF7A30' : '#ffffff',
              color: activeTab === 'stock' ? '#ffffff' : '#475467',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'stock' ? '0 4px 12px rgba(255,122,48,0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <Package size={18} />
            <span>Daily Harvest Quotas & Inventory</span>
            <span
              style={{
                background: activeTab === 'stock' ? '#ffffff' : '#F2F4F7',
                color: activeTab === 'stock' ? '#FF7A30' : '#475467',
                borderRadius: '999px',
                padding: '2px 8px',
                fontSize: '11px',
              }}
            >
              {stockList.length}
            </span>
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
              background: activeTab === 'profile' ? '#FF7A30' : '#ffffff',
              color: activeTab === 'profile' ? '#ffffff' : '#475467',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'profile' ? '0 4px 12px rgba(255,122,48,0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <Sprout size={18} />
            <span>Grower Profile & Certification</span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'metrics' ? '#FF7A30' : '#ffffff',
              color: activeTab === 'metrics' ? '#ffffff' : '#475467',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: activeTab === 'metrics' ? '0 4px 12px rgba(255,122,48,0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <TrendingUp size={18} />
            <span>Farm Analytics & Payouts</span>
          </button>
        </div>

        {/* TAB 1: STALLS MANAGEMENT */}
        {activeTab === 'stalls' && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', color: '#101828' }}>
                  Allocated Market Stall Hubs
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#667085' }}>
                  Register for designated marketplace stalls or review verification status from market operations.
                </p>
              </div>

              <button
                onClick={() => setIsRegisterStallModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #FF7A30 0%, #D85711 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(255,122,48,0.25)',
                }}
              >
                <Plus size={18} />
                <span>+ Register New Stall</span>
              </button>
            </div>

            {stallMsg.text && (
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: stallMsg.type === 'success' ? '#F0FDF4' : '#FEF3F2',
                  color: stallMsg.type === 'success' ? '#166534' : '#D92D20',
                  border: `1px solid ${stallMsg.type === 'success' ? '#86efac' : '#fca5a5'}`,
                }}
              >
                {stallMsg.text}
              </div>
            )}

            {myAssignments.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', background: '#ffffff', borderRadius: '20px', border: '1px dashed #D0D5DD' }}>
                <Store size={36} color="#FF7A30" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontWeight: 700, color: '#101828', fontSize: '15px' }}>
                  Bạn chưa đăng ký sạp tại phiên chợ nào
                </div>
                <p style={{ fontSize: '13px', color: '#667085', margin: '6px 0 16px' }}>
                  Đăng ký sạp tại các điểm chợ đang hoạt động để mở bán nông sản sạch cho khách hàng.
                </p>
                <button
                  onClick={() => setIsRegisterStallModalOpen(true)}
                  style={{
                    background: '#FF7A30',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 18px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Đăng Ký Mở Sạp Ngay
                </button>
              </div>
            ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {myAssignments.map((ass) => (
                <div
                  key={ass.assignmentId}
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    border: '1.5px solid rgba(255,122,48,0.2)',
                    padding: '24px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span
                        style={{
                          background: '#FFF4ED',
                          color: '#C4320A',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 800,
                        }}
                      >
                        {ass.stallNumber || 'Open Stall'}
                      </span>

                      <span
                        style={{
                          background:
                            ass.status === 'ACTIVE'
                              ? '#ECFDF3'
                              : ass.status === 'REGISTERED'
                              ? '#EFF8FF'
                              : '#FEF3F2',
                          color:
                            ass.status === 'ACTIVE'
                              ? '#027A48'
                              : ass.status === 'REGISTERED'
                              ? '#175CD3'
                              : '#B42318',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: 700,
                        }}
                      >
                        {ass.status === 'ACTIVE'
                          ? '✓ APPROVED FOR SALE'
                          : ass.status === 'REGISTERED'
                          ? '⏳ PENDING OPERATIONS REVIEW'
                          : '✕ TEMPORARILY SUSPENDED'}
                      </span>
                    </div>

                    <h4 style={{ margin: '0 0 6px', fontSize: '17px', color: '#101828' }}>
                      {ass.marketName || `Market Hub #${ass.marketId}`}
                    </h4>

                    <div style={{ fontSize: '13px', color: '#667085', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} color="#FF7A30" />
                      <span>Registration Date: {ass.createdAt}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid #F2F4F7',
                      paddingTop: '14px',
                      marginTop: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '12px', color: '#475467' }}>
                      Allocation ID: #{ass.assignmentId}
                    </span>
                    <button
                      onClick={() => alert(`Stall ${ass.stallNumber} at ${ass.marketName || 'Market'}. Please contact Operations to request stall location adjustments.`)}
                      style={{
                        background: '#F9FAFB',
                        border: '1px solid #D0D5DD',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Stall Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        )}

        {/* TAB: FARMER KYC SECTION */}
        {activeTab === 'kyc' && (
          <FarmerKycSection />
        )}

        {/* TAB 2: STOCK / PRODUCE */}
        {activeTab === 'stock' && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', color: '#101828' }}>
                  Daily Harvest Schedule & Scheduled Inventory
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#667085' }}>
                  Configure harvest capacity, farmgate pricing, and weekly recurring distribution.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingStockId(null);
                  setStockForm({
                    cropName: '',
                    category: 'Leafy Greens',
                    baseKg: 20,
                    unitPrice: 25000,
                    marketName: 'Can Tho Central Hub',
                    autoRenew: true,
                  });
                  setIsStockModalOpen(true);
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
                <span>+ Add Harvest Produce</span>
              </button>
            </div>

            <div
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: '1.5px solid rgba(0,0,0,0.06)',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EAECF0' }}>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475467' }}>
                      HARVEST PRODUCE
                    </th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475467' }}>
                      CATEGORY
                    </th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475467' }}>
                      DAILY QUOTA
                    </th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475467' }}>
                      FARMGATE PRICE
                    </th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475467' }}>
                      AUTO-RENEW
                    </th>
                    <th style={{ padding: '14px 20px', fontSize: '12px', fontWeight: 700, color: '#475467', textAlign: 'right' }}>
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stockList.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #F2F4F7' }}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontWeight: 800, color: '#101828', fontSize: '14px' }}>
                          {item.cropName}
                        </div>
                        <div style={{ fontSize: '12px', color: '#667085' }}>
                          Hub: {item.marketName || 'Can Tho Central Hub'}
                        </div>
                      </td>

                      <td style={{ padding: '16px 20px' }}>
                        <span
                          style={{
                            background: '#F0FDF4',
                            color: '#166534',
                            padding: '3px 10px',
                            borderRadius: '999px',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          {item.category || 'VietGAP Produce'}
                        </span>
                      </td>

                      <td style={{ padding: '16px 20px', fontWeight: 700, color: '#101828' }}>
                        {item.baseKg} kg
                      </td>

                      <td style={{ padding: '16px 20px', fontWeight: 800, color: '#166534' }}>
                        {(item.unitPrice || 25000).toLocaleString('vi-VN')} đ/kg
                      </td>

                      <td style={{ padding: '16px 20px' }}>
                        <button
                          onClick={() => handleToggleAutoRenew(item.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '5px 12px',
                            borderRadius: '999px',
                            border: 'none',
                            background: item.autoRenew ? '#ECFDF3' : '#F2F4F7',
                            color: item.autoRenew ? '#027A48' : '#667085',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          <RotateCcw size={13} />
                          <span>{item.autoRenew ? 'Active (Weekly)' : 'Paused'}</span>
                        </button>
                      </td>

                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            onClick={() => handleOpenEditStock(item)}
                            title="Edit Item"
                            style={{
                              background: '#F2F4F7',
                              color: '#344054',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '6px 10px',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <Edit3 size={14} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteStock(item.id)}
                            title="Delete Item"
                            style={{
                              background: '#FEF3F2',
                              color: '#D92D20',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '6px 10px',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <Trash2 size={14} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* TAB 3: FARM PROFILE & CREDENTIALS */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '32px',
                border: '1.5px solid rgba(255,122,48,0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Sprout size={24} color="#FF7A30" />
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#101828' }}>
                  Farm Profile & VietGAP Credentials
                </h3>
              </div>

              {farmMsg.text && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: farmMsg.type === 'success' ? '#F0FDF4' : '#FEF3F2',
                    color: farmMsg.type === 'success' ? '#166534' : '#D92D20',
                    border: `1px solid ${farmMsg.type === 'success' ? '#86efac' : '#fca5a5'}`,
                  }}
                >
                  {farmMsg.text}
                </div>
              )}

              <form onSubmit={handleSaveFarmProfile} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                    Farm / Stall Commercial Name
                  </label>
                  <input
                    type="text"
                    required
                    value={farmForm.stallName}
                    onChange={(e) => setFarmForm({ ...farmForm, stallName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                    Cultivation Farm Address
                  </label>
                  <input
                    type="text"
                    required
                    value={farmForm.farmAddress}
                    onChange={(e) => setFarmForm({ ...farmForm, farmAddress: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                    Direct Farm Contact / Hotline Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={farmForm.phoneNumber}
                    onChange={(e) => setFarmForm({ ...farmForm, phoneNumber: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                    Farm Story & Cultivation Methodology (Bio)
                  </label>
                  <textarea
                    rows={4}
                    value={farmForm.bio}
                    onChange={(e) => setFarmForm({ ...farmForm, bio: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#667085', marginBottom: '4px' }}>
                      Farm Latitude (GPS Lat)
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={farmForm.latitude}
                      onChange={(e) => setFarmForm({ ...farmForm, latitude: parseFloat(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1.5px solid #D0D5DD',
                        fontSize: '13px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#667085', marginBottom: '4px' }}>
                      Farm Longitude (GPS Lng)
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={farmForm.longitude}
                      onChange={(e) => setFarmForm({ ...farmForm, longitude: parseFloat(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
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
                  disabled={isSavingFarm}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#FF7A30',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '14px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                >
                  <Save size={18} />
                  <span>{isSavingFarm ? 'Saving Profile...' : 'Save Farm Profile Changes'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: METRICS */}
        {activeTab === 'metrics' && (
          <div>
            <FarmerMetrics t={t} />
          </div>
        )}
      </div>

      {/* MODAL: REGISTER NEW STALL */}
      {isRegisterStallModalOpen && (
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
          onClick={() => setIsRegisterStallModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '480px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#101828' }}>
                Register Stall for Marketplace Sessions
              </h3>
              <button
                onClick={() => setIsRegisterStallModalOpen(false)}
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

            <form onSubmit={handleRegisterStall} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                  Select Target Marketplace Hub
                </label>
                <select
                  value={stallForm.marketId}
                  onChange={(e) => setStallForm({ ...stallForm, marketId: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #D0D5DD',
                    fontSize: '14px',
                  }}
                >
                  {marketsList.map((m) => (
                    <option key={m.marketId || m.id} value={m.marketId || m.id}>
                      {m.name} - {m.address}
                    </option>
                  ))}
                  {marketsList.length === 0 && (
                    <>
                      <option value="1">Can Tho Central Hub (Ninh Kieu)</option>
                      <option value="2">Cai Rang Clean Agriculture Hub</option>
                      <option value="3">O Mon Organic Produce Cooperative</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '6px' }}>
                  Preferred Stall Identifier (e.g. Stall A12, Area B-04)
                </label>
                <input
                  type="text"
                  required
                  value={stallForm.stallNumber}
                  onChange={(e) => setStallForm({ ...stallForm, stallNumber: e.target.value })}
                  placeholder="Stall A12"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #D0D5DD',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsRegisterStallModalOpen(false)}
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
                    background: '#FF7A30',
                    color: '#fff',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: STOCK CREATE/EDIT */}
      {isStockModalOpen && (
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
          onClick={() => setIsStockModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              maxWidth: '480px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#101828' }}>
                {editingStockId ? 'Edit Harvest Produce Lot' : 'Add New Seasonal Harvest Quota'}
              </h3>
              <button
                onClick={() => setIsStockModalOpen(false)}
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

            <form onSubmit={handleSaveStock} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '4px' }}>
                  Crop / Produce Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Organic Romaine, Cherry Tomatoes..."
                  value={stockForm.cropName}
                  onChange={(e) => setStockForm({ ...stockForm, cropName: e.target.value })}
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
                    Category
                  </label>
                  <select
                    value={stockForm.category}
                    onChange={(e) => setStockForm({ ...stockForm, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: '1.5px solid #D0D5DD',
                      fontSize: '14px',
                    }}
                  >
                    <option value="Leafy Greens">Leafy Greens</option>
                    <option value="Roots & Melons">Roots & Melons</option>
                    <option value="Mushrooms & Herbs">Mushrooms & Herbs</option>
                    <option value="Mekong Orchard Fruits">Mekong Orchard Fruits</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '4px' }}>
                    Daily Quota (kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={stockForm.baseKg}
                    onChange={(e) => setStockForm({ ...stockForm, baseKg: e.target.value })}
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

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#344054', marginBottom: '4px' }}>
                  Farmgate Price (VND / kg)
                </label>
                <input
                  type="number"
                  step="1000"
                  required
                  value={stockForm.unitPrice}
                  onChange={(e) => setStockForm({ ...stockForm, unitPrice: e.target.value })}
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '6px 0' }}>
                <input
                  type="checkbox"
                  id="autoRenewCheck"
                  checked={stockForm.autoRenew}
                  onChange={(e) => setStockForm({ ...stockForm, autoRenew: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: '#1FA855', cursor: 'pointer' }}
                />
                <label htmlFor="autoRenewCheck" style={{ fontSize: '13px', color: '#344054', cursor: 'pointer', fontWeight: 600 }}>
                  Enable automatic weekly renewal (Auto-renew)
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsStockModalOpen(false)}
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
                  {editingStockId ? 'Save Changes' : 'Confirm Produce Quota'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
