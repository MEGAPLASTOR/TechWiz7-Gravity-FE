import React from 'react';
import { Plus, ToggleRight, ToggleLeft } from 'lucide-react';
import { formatCurrencyVND } from '@/utils/formatters';

export default function StockTemplatesTable({ templates, onToggleAutoRenew, t }) {
  return (
    <div 
      className="clay-card"
      style={{ padding: '24px', borderRadius: '28px', background: '#ffffff' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <h3 style={{ fontSize: '18px', color: '#101828', margin: 0 }}>
            {t.recurringTemplateTitle}
          </h3>
          <p style={{ fontSize: '13px', color: '#667085', margin: '4px 0 0' }}>
            {t.recurringTemplateSub}
          </p>
        </div>

        <button 
          className="clay-btn-primary"
          onClick={() => alert('Open Create Recurring Quota Template modal')}
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          <Plus size={16} />
          <span>{t.addProductQuota}</span>
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E4E7EC' }}>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: '#475467' }}>{t.colProduct}</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: '#475467' }}>{t.colDays}</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: '#475467' }}>{t.colQuota}</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: '#475467' }}>{t.colCutoff}</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: '#475467' }}>{t.colPrice}</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: '#475467' }}>{t.colAutoRenew}</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: '#475467' }}>{t.colStatus}</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((tpl) => (
              <tr key={tpl.id} style={{ borderBottom: '1px solid #F2F4F7' }}>
                <td style={{ padding: '14px 16px', fontWeight: '700', color: '#101828' }}>
                  {tpl.productName}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {tpl.days.map((d, i) => (
                      <span 
                        key={i}
                        style={{
                          background: '#EAF4EC',
                          color: '#1FA855',
                          padding: '2px 6px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontWeight: '600' }}>
                  {tpl.dailyQuota} units
                </td>
                <td style={{ padding: '14px 16px', color: '#FF7A30', fontWeight: '600' }}>
                  {tpl.cutoffTime}
                </td>
                <td style={{ padding: '14px 16px', fontWeight: '700', color: '#1FA855' }}>
                  {formatCurrencyVND(tpl.price)}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <button
                    onClick={() => onToggleAutoRenew(tpl.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: tpl.autoRenew ? '#1FA855' : '#98A2B3'
                    }}
                  >
                    {tpl.autoRenew ? (
                      <ToggleRight size={24} color="#1FA855" />
                    ) : (
                      <ToggleLeft size={24} color="#98A2B3" />
                    )}
                    <span style={{ fontSize: '11px', fontWeight: 600 }}>
                      {tpl.autoRenew ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span 
                    style={{
                      background: tpl.status === 'Đang áp dụng' ? '#ECFDF3' : '#F2F4F7',
                      color: tpl.status === 'Đang áp dụng' ? '#027A48' : '#667085',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}
                  >
                    {tpl.status === 'Đang áp dụng' ? t.statusActive : t.statusPaused}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
