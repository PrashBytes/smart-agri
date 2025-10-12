import React from "react";

export default function DailyAdviceCard({ t, status, text }) {
  const toneClass = status === "urgent" ? "advice-urgent" : status === "warn" ? "advice-warn" : "advice-good";
  const badgeClass = status === "urgent" ? "status-badge status-urgent" : status === "warn" ? "status-badge status-warn" : "status-badge status-good";
  const badgeText = status === "urgent" ? t.urgent : status === "warn" ? t.caution : t.good;
  
  const iconMap = {
    urgent: "🚨",
    warn: "⚠️", 
    good: "✅"
  };

  return (
    <div className={`dashboard-card ${toneClass}`} style={{ 
      marginBottom: 'var(--space-6)',
      background: status === "urgent" 
        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(255, 255, 255, 0.95))' 
        : status === "warn" 
        ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(255, 255, 255, 0.95))'
        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(255, 255, 255, 0.95))'
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 'var(--space-3)' }}>
        <div style={{ display: "flex", alignItems: "center", gap: 'var(--space-2)' }}>
          <span style={{ fontSize: '1.5rem' }}>{iconMap[status]}</span>
          <h3 style={{ 
            margin: 0, 
            fontSize: 'var(--font-size-lg)', 
            fontWeight: 700, 
            color: 'var(--gray-800)' 
          }}>
            {t.dailyAdvice}
          </h3>
        </div>
        <span className={badgeClass}>{badgeText}</span>
      </div>
      <div style={{ 
        fontSize: 'var(--font-size-base)', 
        color: 'var(--gray-700)', 
        lineHeight: 1.6,
        padding: 'var(--space-3)',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}>
        {text}
      </div>
    </div>
  );
}