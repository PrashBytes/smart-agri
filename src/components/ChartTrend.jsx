import React from "react";

export default function ChartTrend({ t, history, weather }) {
  const bar = (val, color = "var(--secondary-blue)", label = "") => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 'var(--space-2)', 
      marginBottom: 'var(--space-2)' 
    }}>
      {label && (
        <span style={{ 
          fontSize: 'var(--font-size-xs)', 
          color: 'var(--gray-600)', 
          minWidth: '60px',
          fontWeight: 500
        }}>
          {label}
        </span>
      )}
      <div style={{ 
        flex: 1,
        height: '12px', 
        background: 'var(--gray-200)', 
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{ 
          width: `${Math.max(2, val)}%`, 
          height: '100%', 
          background: color, 
          borderRadius: 'var(--radius-lg)',
          transition: 'all var(--transition-normal)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            animation: 'shimmer 2s infinite'
          }} />
        </div>
      </div>
      <span style={{ 
        fontSize: 'var(--font-size-xs)', 
        color: 'var(--gray-700)', 
        fontWeight: 600,
        minWidth: '35px',
        textAlign: 'right'
      }}>
        {val}%
      </span>
    </div>
  );

  return (
    <section style={{ 
      marginTop: 'var(--space-6)',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'var(--space-6)'
    }}>
      {/* Soil Moisture Trend */}
      <div className="dashboard-card">
        <div style={{ display: "flex", alignItems: "center", gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          <span style={{ fontSize: '1.5rem' }}>📊</span>
          <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 600, color: 'var(--gray-800)' }}>
            {t.chartsTrends}
          </h3>
        </div>
        
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h4 style={{ 
            margin: 0, 
            marginBottom: 'var(--space-3)',
            fontSize: 'var(--font-size-base)', 
            fontWeight: 600, 
            color: 'var(--gray-700)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)'
          }}>
            <span>💧</span>
            Soil Moisture Trend
          </h4>
          {history.moisture.map((m, i) => 
            bar(m, 'var(--gradient-primary)', `Day ${i + 1}`)
          )}
        </div>
      </div>

      {/* Tank Level Trend */}
      <div className="dashboard-card">
        <div style={{ display: "flex", alignItems: "center", gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          <span style={{ fontSize: '1.5rem' }}>🚰</span>
          <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 600, color: 'var(--gray-800)' }}>
            Tank Level History
          </h3>
        </div>
        
        <div>
          {history.tank.map((tl, i) => 
            bar(Math.round((tl / 250) * 100), 'var(--gradient-secondary)', `Day ${i + 1}`)
          )}
        </div>
      </div>

      {/* Rainfall Forecast */}
      <div className="dashboard-card">
        <div style={{ display: "flex", alignItems: "center", gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          <span style={{ fontSize: '1.5rem' }}>🌧️</span>
          <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 600, color: 'var(--gray-800)' }}>
            Rainfall Forecast
          </h3>
        </div>
        
        <div>
          {weather.map((w, i) => (
            <div key={`w${i}`} style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 'var(--space-1)'
              }}>
                <span style={{ 
                  fontSize: 'var(--font-size-sm)', 
                  color: 'var(--gray-600)',
                  fontWeight: 500
                }}>
                  {w.day}
                </span>
                <span style={{ 
                  fontSize: 'var(--font-size-xs)', 
                  color: 'var(--gray-700)',
                  fontWeight: 600
                }}>
                  {w.rainMM}mm
                </span>
              </div>
              <div style={{ 
                height: '8px', 
                background: 'var(--gray-200)', 
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${Math.min(100, w.rainMM * 5)}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, var(--secondary-blue), #60a5fa)', 
                  borderRadius: 'var(--radius-lg)',
                  transition: 'all var(--transition-normal)'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}