import React from "react";

export default function ActionButtons({ t, onIrrigate, onFertilize, onPestCheck, tankLiters }) {
  return (
    <section className="dashboard-card" style={{ marginTop: 'var(--space-6)' }}>
      <div style={{ display: "flex", alignItems: "center", gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        <span style={{ fontSize: '1.5rem' }}>⚡</span>
        <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 600, color: 'var(--gray-800)' }}>
          {t.actions}
        </h3>
      </div>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: 'var(--space-4)' 
      }}>
        <button 
          className="modern-btn" 
          onClick={onIrrigate}
          style={{
            background: tankLiters > 0 ? 'var(--gradient-primary)' : 'var(--gray-400)',
            cursor: tankLiters > 0 ? 'pointer' : 'not-allowed',
            opacity: tankLiters > 0 ? 1 : 0.6
          }}
          disabled={tankLiters <= 0}
        >
          <span style={{ marginRight: 'var(--space-2)' }}>💧</span>
          {t.irrigateNow}
        </button>
        
        <button className="modern-btn" onClick={onFertilize} style={{ background: 'var(--gradient-secondary)' }}>
          <span style={{ marginRight: 'var(--space-2)' }}>🌿</span>
          {t.applyFertilizer}
        </button>
        
        <button className="modern-btn" onClick={onPestCheck} style={{ 
          background: 'linear-gradient(135deg, var(--accent-orange), #fbbf24)' 
        }}>
          <span style={{ marginRight: 'var(--space-2)' }}>🐛</span>
          {t.checkPestRisk}
        </button>
      </div>
      
      {tankLiters <= 0 && (
        <div style={{ 
          marginTop: 'var(--space-4)', 
          padding: 'var(--space-3)',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: 'var(--radius-lg)',
          color: '#ef4444',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)'
        }}>
          <span>⚠️</span>
          {t.tankEmpty}
        </div>
      )}
    </section>
  );
}