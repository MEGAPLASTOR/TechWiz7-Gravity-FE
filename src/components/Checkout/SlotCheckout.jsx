import React, { useState, useEffect } from 'react';
import { Ticket } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TIME_SLOTS_DATA, generateMarketTimeSlots } from '@/services/marketService';
import { TRANSLATIONS } from '@/constants/translations';
import { useAuth } from '@/context/AuthContext';
import TimeSlotSelector from './TimeSlotSelector';
import CustomerForm from './CustomerForm';
import BasketReview from './BasketReview';
import PickupPassTicket from './PickupPassTicket';

export default function SlotCheckout({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  selectedMarket,
  onOpenMap,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang];
  const { user } = useAuth();
  const marketSlots = React.useMemo(() => {
    return generateMarketTimeSlots(selectedMarket?.schedules);
  }, [selectedMarket]);

  const [selectedSlot, setSelectedSlot] = useState(marketSlots[0] || TIME_SLOTS_DATA[0]);
  const [customerName, setCustomerName] = useState(user?.fullName || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phoneNumber || '');
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [isGeneratingTicket, setIsGeneratingTicket] = useState(false);

  useEffect(() => {
    if (marketSlots.length > 0 && (!selectedSlot || !marketSlots.some(s => s.id === selectedSlot.id))) {
      setSelectedSlot(marketSlots[0]);
    }
  }, [marketSlots]);

  useEffect(() => {
    if (user?.fullName && !customerName) {
      setCustomerName(user.fullName);
    }
    if (user?.phoneNumber && !customerPhone) {
      setCustomerPhone(user.phoneNumber);
    }
  }, [user]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsGeneratingTicket(true);

    setTimeout(() => {
      setIsGeneratingTicket(false);

      try {
        confetti({
          particleCount: 85,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const newOrder = {
        orderCode: `#ML-${randomSuffix}`,
        customerName: customerName || 'Khách hàng',
        customerPhone: customerPhone || 'Tại quầy',
        market: selectedMarket,
        slot: selectedSlot,
        date: new Date().toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        items: [...cartItems],
        total: cartTotal,
        createdAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'CONFIRMED_AWAITING_PICKUP',
        paymentMethod: 'Pay-At-Pickup (Zero Gateway)',
      };

      setConfirmedOrder(newOrder);
    }, 1200);
  };

  return (
    <section id="checkout-section" style={{ padding: '24px 20px 48px' }}>
      <div className="container">
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span 
              className="clay-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                background: '#EAF4EC',
                color: '#1FA855',
                fontSize: '12px',
                fontWeight: '700'
              }}
            >
              <Ticket size={14} />
              {t.panel3Title}
            </span>
          </div>
          <h2 style={{ fontSize: '32px', color: '#101828', margin: 0 }}>
            {t.checkoutHeading}
          </h2>
          <p style={{ fontSize: '15px', color: '#475467', margin: '4px 0 0' }}>
            {t.checkoutSubtitle}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <CustomerForm
              selectedMarket={selectedMarket}
              onOpenMap={onOpenMap}
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerPhone={customerPhone}
              setCustomerPhone={setCustomerPhone}
              t={t}
            />

            <TimeSlotSelector
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
              slots={marketSlots}
              t={t}
            />

            <BasketReview
              cartItems={cartItems}
              cartTotal={cartTotal}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
              isGeneratingTicket={isGeneratingTicket}
              onConfirmOrder={handleConfirmOrder}
              t={t}
            />
          </div>

          <PickupPassTicket
            confirmedOrder={confirmedOrder}
            selectedMarket={selectedMarket}
            selectedSlot={selectedSlot}
            customerName={customerName}
            customerPhone={customerPhone}
            cartTotal={cartTotal}
            lang={lang}
            t={t}
          />
        </div>
      </div>
    </section>
  );
}
