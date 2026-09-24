import React from 'react';
import { MapPin, ArrowRight, ShieldCheck, ChevronRight, Compass } from 'lucide-react';
import { TRANSLATIONS } from '@/constants/translations';
import FeaturedFarmers from './FeaturedFarmers';
import FarmStall from './FarmStall';
import OrderCutoff from './OrderCutoff';
import CategoryChips from './CategoryChips';
import MiniCartWidget from './MiniCartWidget';
import MiniMapWidget from './MiniMapWidget';
import FreshCatalogWidget from './FreshCatalogWidget';

export default function HeroSection({ 
  selectedMarket, 
  onOpenMap, 
  onExploreProducts, 
  featuredFarmers,
  cartItems,
  cartTotal,
  onOpenCart,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang];

  return (
    <section style={{ padding: '8px 20px 32px' }}>
      <div 
        className="container"
        style={{
          background: 'linear-gradient(135deg, #1b633d 0%, #237a4c 60%, #165633 100%)',
          borderRadius: '36px',
          padding: '24px 28px 36px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(18, 70, 42, 0.28), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-40px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(46, 213, 115, 0.25) 0%, rgba(27, 99, 61, 0) 70%)',
            pointerEvents: 'none'
          }}
        />

        <div 
          className="clay-card card-3d-tilt"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '30px',
            padding: '36px 40px',
            position: 'relative',
            minHeight: '490px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 16px 40px rgba(10, 40, 24, 0.15), inset -3px -3px 8px rgba(0,0,0,0.04), inset 3px 3px 8px rgba(255,255,255,0.95)',
            border: '1px solid rgba(255, 255, 255, 0.85)'
          }}
        >
          <FeaturedFarmers featuredFarmers={featuredFarmers} title={t.featuredFarmers} />

          <FarmStall onOpenMap={onOpenMap} nearbyMarketsBtnText={t.nearbyMarketsBtn} />

          <div 
            className="tilt-inner"
            style={{
              flex: '1.2',
              paddingLeft: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              zIndex: 6
            }}
          >
            <CategoryChips />

            <h1 
              style={{
                fontSize: '42px',
                fontWeight: '800',
                color: '#101828',
                lineHeight: 1.15,
                letterSpacing: '-1.5px',
                fontFamily: 'var(--font-header)',
                margin: 0
              }}
            >
              {t.heroTitlePart1}
              <span style={{ color: '#1FA855' }}>{t.heroTitlePreOrder}</span>
              {t.heroTitleAnd}
              <span style={{ color: '#FF7A30' }}>{t.heroTitlePayPickup}</span>
            </h1>

            <p 
              style={{
                fontSize: '15px',
                color: '#475467',
                lineHeight: 1.5,
                maxWidth: '520px',
                margin: 0
              }}
            >
              {t.heroSubtitle}
            </p>

            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                borderRadius: '18px',
                background: '#F7FCF8',
                border: '1px solid rgba(31, 168, 85, 0.25)',
                maxWidth: '480px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div 
                  style={{
                    background: '#1FA855',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#667085', fontWeight: 600 }}>{t.defaultHubLabel}</div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#101828' }}>
                    {selectedMarket?.shortName || 'Can Tho Central Market'} ({selectedMarket?.distance || '1.2 km'})
                  </div>
                </div>
              </div>
              <button
                onClick={onOpenMap}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1FA855',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                {t.changeMarket} <ChevronRight size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '4px' }}>
              <button 
                className="clay-btn-primary"
                onClick={onExploreProducts}
                style={{
                  fontSize: '16px',
                  padding: '14px 30px',
                  borderRadius: '20px'
                }}
              >
                <span>{t.exploreProducts}</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="clay-btn-subtle"
                onClick={onOpenMap}
                style={{
                  fontSize: '15px',
                  padding: '14px 22px',
                  borderRadius: '20px'
                }}
              >
                <Compass size={18} color="#1FA855" />
                <span>{t.nearbyMarketsBtn}</span>
              </button>
            </div>
          </div>

          <OrderCutoff cutoffTitle={t.cutoffTitle} />

          <MiniMapWidget 
            selectedMarket={selectedMarket} 
            onOpenMap={onOpenMap} 
            title={t.miniMapTitle} 
            hubsCount={t.miniMapHubs} 
          />

          <MiniCartWidget 
            cartItems={cartItems} 
            cartTotal={cartTotal} 
            lang={lang} 
            onOpenCart={onOpenCart} 
          />

          <FreshCatalogWidget onExploreProducts={onExploreProducts} />
        </div>
      </div>
    </section>
  );
}
