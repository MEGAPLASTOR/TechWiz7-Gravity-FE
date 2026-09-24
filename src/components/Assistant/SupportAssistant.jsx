import React, { useState } from 'react';
import { 
  Headphones, 
  Sparkles, 
  X, 
  Send
} from 'lucide-react';
import { TRANSLATIONS } from '@/constants/translations';

export default function SupportAssistant({ selectedMarket, lang = 'en' }) {
  const t = TRANSLATIONS[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: lang === 'en' 
        ? 'Hello! I am your MarketLink Support Assistant 🌾. How can I assist you with fresh harvests, morning pickup slots, or farmer verification today?'
        : 'Xin chào! Em là tư vấn viên MarketLink 🌾. Em có thể hỗ trợ gì cho bạn về nông sản sạch, khung giờ nhận tại chợ hoặc thông tin nông hộ?',
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickQuestions = lang === 'en' ? [
    'What fresh veggies are arriving tomorrow morning?',
    'What time is the daily order cutoff?',
    'How does Pay-At-Pickup (Zero Gateway) work?',
    'How can farmers register for VietGAP verification?'
  ] : [
    'Phiên chợ sáng mai có những nông sản tươi gì?',
    'Giờ chốt đơn (Cutoff) hôm nay là mấy giờ?',
    'Pay-At-Pickup (Zero Gateway) hoạt động ra sao?',
    'Cách nông dân đăng ký chứng nhận VietGAP?'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString(lang === 'en' ? 'en-US' : 'vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      let botReply = lang === 'en'
        ? 'Thank you for asking! MarketLink connects you directly with certified local growers.'
        : 'Cảm ơn bạn đã hỏi! MarketLink hỗ trợ kết nối trực tiếp bạn với nông dân địa phương uy tín.';
      const lower = query.toLowerCase();

      if (lower.includes('veggie') || lower.includes('rau') || lower.includes('harvest') || lower.includes('tươi')) {
        botReply = lang === 'en'
          ? `Tomorrow morning at ${selectedMarket?.shortName || selectedMarket?.name || 'Farmers Market'}, growers will dispatch fresh seasonal harvests strictly according to today pre-order lists. All picked fresh early in the morning!`
          : `Sáng mai tại ${selectedMarket?.name || 'Phiên chợ nông sản'}, bà con nông dân sẽ xuất vườn nông sản tươi sạch theo đúng số lượng đã được đặt trước. Tất cả đều thu hoạch sớm tinh mơ trong ngày!`;
      } else if (lower.includes('cutoff') || lower.includes('chốt đơn') || lower.includes('time') || lower.includes('giờ')) {
        botReply = lang === 'en'
          ? 'The system cut-off is strictly 21:00 nightly. This gives our farmers time to finalize packaging and begin harvesting early at 04:00 AM for morning pickup windows.'
          : 'Hệ thống chốt đơn hàng ngày vào lúc 21:00 tối hôm trước để bà con nông dân chốt số lượng, tiến hành thu hái sớm tinh mơ vào 04:00 AM hôm sau.';
      } else if (lower.includes('pay') || lower.includes('thanh toán') || lower.includes('pickup') || lower.includes('zero gateway')) {
        botReply = lang === 'en'
          ? 'With Pay-At-Pickup (Zero Gateway), you pay 0% intermediary platform fees. Simply pick up your bag at the market stall, check quality by hand, and settle via cash or direct VietQR.'
          : 'Mô hình Pay-At-Pickup (Zero Gateway) hoàn toàn không thu tiền trực tuyến trước. Bạn đến quầy kiểm tra rau củ tận tay rồi mới trả tiền mặt hoặc quét VietQR trực tiếp cho nông dân. Phí sàn 0 đồng!';
      } else if (lower.includes('kyc') || lower.includes('register') || lower.includes('vietgap') || lower.includes('đăng ký')) {
        botReply = lang === 'en'
          ? 'Farmers can register a Farmer Account on MarketLink to showcase VietGAP/GlobalGAP harvests directly to local consumers.'
          : 'Bà con nông dân có thể tạo tài khoản Nông Dân trên MarketLink để kết nối tiêu thụ nông sản chuẩn VietGAP/GlobalGAP trực tiếp tới người tiêu dùng.';
      }

      const botMsg = {
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString(lang === 'en' ? 'en-US' : 'vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 90
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="clay-pill card-3d-tilt"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 20px',
            border: '2px solid rgba(255, 255, 255, 0.9)',
            background: 'linear-gradient(135deg, #1FA855 0%, #15803d 100%)',
            color: '#ffffff',
            cursor: 'pointer',
            boxShadow: '0 12px 28px rgba(31, 168, 85, 0.45), inset 0 2px 4px rgba(255,255,255,0.4)',
            transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <div 
            className="spin-3d-coin"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: '#ffffff',
              color: '#1FA855',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 8px rgba(0,0,0,0.15)'
            }}
          >
            <Headphones size={18} />
          </div>

          <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
            <div style={{ fontSize: '14px', fontWeight: '800', fontFamily: 'var(--font-header)' }}>
              {t.botButtonTitle}
            </div>
            <div style={{ fontSize: '11px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a7f3d0' }} />
              {t.botOnline}
            </div>
          </div>
        </button>
      </div>

      {isOpen && (
        <div 
          className="clay-card card-3d-tilt"
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '24px',
            width: '380px',
            maxWidth: 'calc(100vw - 48px)',
            height: '520px',
            background: '#ffffff',
            borderRadius: '28px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
            zIndex: 95,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '2px solid rgba(31, 168, 85, 0.25)'
          }}
        >
          <div 
            style={{
              background: 'linear-gradient(135deg, #1FA855 0%, #15803d 100%)',
              padding: '16px 20px',
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: '#ffffff',
                  color: '#1FA855',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Headphones size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', margin: 0, fontWeight: '800' }}>
                  {t.botModalTitle}
                </h4>
                <p style={{ fontSize: '11px', margin: 0, opacity: 0.85 }}>
                  {t.botModalSub}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>

          <div 
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: '#F9FCFA'
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '82%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div
                  style={{
                    background: m.sender === 'user' ? '#1FA855' : '#ffffff',
                    color: m.sender === 'user' ? '#ffffff' : '#1D2939',
                    padding: '10px 14px',
                    borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    fontSize: '13px',
                    lineHeight: 1.45,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    border: m.sender === 'user' ? 'none' : '1px solid #E4E7EC'
                  }}
                >
                  {m.text}
                </div>
                <span 
                  style={{
                    fontSize: '10px',
                    color: '#98A2B3',
                    alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    padding: '0 4px'
                  }}
                >
                  {m.time}
                </span>
              </div>
            ))}
          </div>

          <div 
            style={{
              padding: '8px 12px',
              background: '#ffffff',
              borderTop: '1px solid #F2F4F7',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              scrollbarWidth: 'none'
            }}
          >
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                style={{
                  background: '#F0FDF4',
                  color: '#15803d',
                  border: '1px solid rgba(31, 168, 85, 0.25)',
                  padding: '5px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          <div 
            style={{
              padding: '12px 14px',
              background: '#ffffff',
              borderTop: '1px solid #E4E7EC',
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder={t.botPlaceholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                padding: '8px 14px',
                borderRadius: '999px',
                border: '1px solid #D0D5DD',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'var(--font-data)'
              }}
            />
            <button
              onClick={() => handleSend()}
              style={{
                background: '#1FA855',
                color: '#ffffff',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
