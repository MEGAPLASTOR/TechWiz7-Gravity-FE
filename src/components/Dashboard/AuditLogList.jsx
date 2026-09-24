import React from 'react';
import { Activity } from 'lucide-react';

export default function AuditLogList({ auditLogs, title }) {
  return (
    <div 
      className="clay-card"
      style={{ padding: '24px', borderRadius: '28px', background: '#ffffff' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <Activity size={18} color="#2563EB" />
        <h3 style={{ fontSize: '18px', color: '#101828', margin: 0 }}>
          {title}
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {auditLogs.map((log) => (
          <div 
            key={log.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: '#F9FAFB',
              borderRadius: '12px',
              fontSize: '12px',
              borderLeft: `4px solid ${log.type === 'success' ? '#1FA855' : log.type === 'warning' ? '#FF7A30' : '#2563EB'}`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontFamily: 'monospace', color: '#667085', fontWeight: '600' }}>
                [{log.timestamp}]
              </span>
              <span 
                style={{
                  background: '#E4E7EC',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontWeight: '700',
                  fontSize: '11px',
                  color: '#344054'
                }}
              >
                {log.action}
              </span>
              <strong style={{ color: '#101828' }}>{log.actor}:</strong>
              <span style={{ color: '#475467' }}>{log.details}</span>
            </div>

            <span style={{ fontSize: '11px', color: '#1FA855', fontWeight: '700' }}>
              Logged ✓
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
