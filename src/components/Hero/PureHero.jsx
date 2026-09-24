import React, { useState, useEffect } from 'react';
import HeroNavbar from './PureHero/HeroNavbar';
import HeroFeaturedFarmers from './PureHero/HeroFeaturedFarmers';
import HeroOrderCutoff from './PureHero/HeroOrderCutoff';
import HeroFreshCatalog from './PureHero/HeroFreshCatalog';
import HeroFarmStall from './PureHero/HeroFarmStall';
import HeroHeadline from './PureHero/HeroHeadline';
import HeroMiniCart from './PureHero/HeroMiniCart';
import HeroMiniMap from './PureHero/HeroMiniMap';
import { useCategories } from '@/hooks/useCategories';
import { getFarmersAtMarket } from '@/api/marketsApi';

function getChipEmoji(slug = '') {
  const s = slug.toLowerCase();
  if (s === 'all') return '✨';
  if (s.includes('rau')) return '🥗';
  if (s.includes('cu')) return '🥕';
  if (s.includes('trai')) return '🍊';
  if (s.includes('nam')) return '🍄';
  if (s.includes('che-pham') || s.includes('trung')) return '🧀';
  return '🌱';
}

export default function PureHero({
  onOpenMap,
  onExploreProducts,
  onOpenCart,
  cartCount,
  cartTotal,
  selectedCategory,
  onSelectCategory,
  currentRole,
  onRoleChange,
  searchQuery,
  setSearchQuery,
  onNavigateSection,
  isLoggedIn,
  user,
  onOpenLogin,
  onOpenRegister,
  onLogout,
  selectedMarket,
}) {
  const { categories } = useCategories();
  const [farmers, setFarmers] = useState([]);

  // Lấy danh sách nông dân thật từ API điểm chợ nếu có
  useEffect(() => {
    if (!Number.isFinite(selectedMarket?.marketId)) return;
    let isMounted = true;
    getFarmersAtMarket(selectedMarket.marketId)
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const mapped = data.map((f) => ({
            id: `f-${f.farmerId || f.assignmentId}`,
            name: f.farmerName || 'Nông dân',
            farm: f.stallName || f.farmAddress || 'Trang trại liên kết',
            avatar: f.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
          }));
          setFarmers(mapped);
        }
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, [selectedMarket]);

  const chips = categories.map((cat) => ({
    id: cat.id,
    label: `${getChipEmoji(cat.slug || cat.id)} ${cat.label}`,
  }));

  return (
    <>
      <style>{`
        @keyframes pingRipple {
          0%   { transform: scale(0.5); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes heroFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes heroFloatB {
          0%,100% { transform: translateY(0px) rotate(0.4deg); }
          50%      { transform: translateY(-7px) rotate(-0.4deg); }
        }
        @keyframes bokehDrift {
          0%,100% { transform: translate(0,0) scale(1); }
          33%     { transform: translate(18px,-12px) scale(1.08); }
          66%     { transform: translate(-12px,16px) scale(0.94); }
        }
        @keyframes countdownPulse {
          0%,100% { color: #101828; }
          50%     { color: #1FA855; }
        }
      `}</style>

      <section
        style={{
          background: '#19623D',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px 24px 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {[
          { top: '8%',  left: '12%', w: 520, h: 420, color: 'rgba(45,213,110,0.22)' },
          { top: '55%', left: '60%', w: 600, h: 480, color: 'rgba(31,168,85,0.18)' },
          { top: '20%', left: '70%', w: 380, h: 340, color: 'rgba(16,90,50,0.35)' },
          { top: '65%', left: '5%',  w: 440, h: 380, color: 'rgba(38,142,88,0.20)' },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: b.top,
              left: b.left,
              width: b.w,
              height: b.h,
              borderRadius: '50%',
              background: b.color,
              filter: 'blur(72px)',
              pointerEvents: 'none',
              animation: `bokehDrift ${10 + i * 2.5}s ease-in-out infinite ${i * 1.2}s`,
            }}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 1200,
            height: 800,
            background: 'radial-gradient(ellipse at center, rgba(44,168,88,0.38) 0%, rgba(25,98,61,0) 68%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ width: '100%', maxWidth: 1300, position: 'relative', zIndex: 10 }}>
          <HeroNavbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onNavigateSection={onNavigateSection}
            onOpenMap={onOpenMap}
            isLoggedIn={isLoggedIn}
            user={user}
            currentRole={currentRole}
            onOpenLogin={onOpenLogin}
            onOpenRegister={onOpenRegister}
            onLogout={onLogout}
          />

          <div style={{ position: 'relative', width: '100%' }}>
            <HeroFeaturedFarmers farmers={farmers} />

            <HeroOrderCutoff onNavigateSection={onNavigateSection} />

            <HeroFreshCatalog onNavigateSection={onNavigateSection} />

            <div
              style={{
                background: '#ffffff',
                borderRadius: 36,
                padding: '30px 52px 52px',
                boxShadow:
                  '0 40px 90px rgba(0,0,0,0.20), 0 16px 32px rgba(0,0,0,0.10), inset 0 3px 6px rgba(255,255,255,0.95)',
                minHeight: 500,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'visible',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
                {chips.map((c) => {
                  const sel = (selectedCategory || 'all') === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        if (onSelectCategory) onSelectCategory(c.id);
                      }}
                      style={{
                        padding: '9px 20px',
                        borderRadius: 999,
                        border: 'none',
                        background: sel
                          ? 'linear-gradient(135deg, #25ba5f 0%, #1a964a 100%)'
                          : '#EDF6EF',
                        color: sel ? '#fff' : '#344054',
                        fontFamily: 'var(--font-header)',
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        boxShadow: sel
                          ? '0 6px 16px rgba(21,101,52,0.38), inset 0 2px 3px rgba(255,255,255,0.3)'
                          : '0 2px 6px rgba(0,0,0,0.06)',
                        transition: 'all 0.2s ease',
                        letterSpacing: sel ? '0.01em' : 'normal',
                      }}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 28,
                  flexWrap: 'wrap',
                }}
              >
                <HeroFarmStall
                  onOpenMap={onOpenMap}
                  onNavigateSection={onNavigateSection}
                />

                <HeroHeadline
                  onExploreProducts={onExploreProducts}
                  onOpenMap={onOpenMap}
                  selectedMarket={selectedMarket}
                />
              </div>
            </div>

            <HeroMiniCart
              onOpenCart={onOpenCart}
              cartCount={cartCount}
              cartTotal={cartTotal}
            />

            <HeroMiniMap onOpenMap={onOpenMap} />
          </div>

          <div style={{ height: 80 }} />
        </div>
      </section>
    </>
  );
}
