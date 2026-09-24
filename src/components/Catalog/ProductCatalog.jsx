import React, { useState } from 'react';
import { PackageOpen, RefreshCw, Loader2, MapPin } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { TRANSLATIONS } from '@/constants/translations';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';

export default function ProductCatalog({ 
  onAddToCart, 
  cartItems, 
  searchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  selectedMarket,
  onOpenMap,
  lang = 'en' 
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [addedAnimationId, setAddedAnimationId] = useState(null);
  const { categories } = useCategories();
  const { products, isLoading, error, refetch } = useProducts(selectedCategory, searchQuery, selectedMarket);

  const filterLabels = {
    all: t.filterAll,
    leafy: t.filterLeafy,
    veggies: t.filterVeggies,
    fruits: t.filterFruits,
    dairy: t.filterDairy,
  };

  const handleAdd = (product) => {
    onAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1000);
  };

  return (
    <section id="catalog-section" style={{ padding: '24px 20px 48px' }}>
      <div className="container">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          quotaAlertText={`${products.length} sạp nông dân đã xác thực`}
          panelTitle={t.panel2Title}
          heading={t.catalogHeading}
          subtitle={selectedMarket?.name ? `Đặt trước nông sản nhận tại ${selectedMarket.name} • Thanh toán trực tiếp tại quầy` : t.catalogSubtitle}
          filterLabels={filterLabels}
        />

        {isLoading ? (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '64px 20px',
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #E4E7EC'
            }}
          >
            <Loader2 size={36} color="#1FA855" className="animate-spin" style={{ marginBottom: '12px' }} />
            <p style={{ fontSize: '14px', color: '#667085', fontWeight: 600 }}>
              {lang === 'vi' ? 'Đang kết nối API phiên chợ & sạp nông dân...' : 'Loading market stalls and harvests from live API...'}
            </p>
          </div>
        ) : products.length === 0 ? (
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '56px 20px',
              background: '#ffffff',
              borderRadius: '28px',
              border: '1.5px dashed #D0D5DD',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
            }}
          >
            <div 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#F0FDF4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}
            >
              <PackageOpen size={32} color="#1FA855" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#101828', marginBottom: '6px' }}>
              {lang === 'vi' ? 'Chưa có sạp nông dân nào tại phiên chợ này' : 'No grower stalls registered at this market'}
            </h3>
            <p style={{ fontSize: '14px', color: '#667085', maxWidth: '460px', lineHeight: 1.5, marginBottom: '20px' }}>
              {lang === 'vi'
                ? `Phiên chợ "${selectedMarket?.name || 'đang chọn'}" hiện chưa có sạp nông dân nào được phân công trên hệ thống. Dữ liệu được kết nối trực tiếp từ API Chợ Nông Sản (GET /api/markets/{id}/farmers).`
                : `Market "${selectedMarket?.name || 'selected'}" has no grower stalls assigned in the database yet. Live data is fetched from GET /api/markets/{id}/farmers.`}
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {onOpenMap && (
                <button
                  onClick={onOpenMap}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    background: '#F0FDF4',
                    color: '#166534',
                    border: '1px solid #BBF7D0',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <MapPin size={15} />
                  {lang === 'vi' ? 'Xem các chợ khác trên bản đồ' : 'Browse other markets'}
                </button>
              )}
              <button
                onClick={refetch}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  background: '#1FA855',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(31, 168, 85, 0.25)'
                }}
              >
                <RefreshCw size={15} />
                {lang === 'vi' ? 'Tải lại dữ liệu API' : 'Reload API Data'}
              </button>
            </div>
          </div>
        ) : (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            {products.map((prod) => {
              const inCartQty = cartItems.find((item) => item.id === prod.id)?.quantity || 0;
              const isJustAdded = addedAnimationId === prod.id;

              return (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  inCartQty={inCartQty}
                  isJustAdded={isJustAdded}
                  onAdd={handleAdd}
                  t={t}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
