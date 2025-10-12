import React, { useState } from "react";

export default function ScenarioSimulator({ t, onRun }) {
  const [amount, setAmount] = useState(150);
  const [freq, setFreq] = useState(2);
  const [crop, setCrop] = useState("Paddy");
  const [soil, setSoil] = useState("Loam");

  const modernSlider = (value, onChange, min, max, unit, label) => (
    <div style={{ marginBottom: 'var(--space-4)' }}>
      <label style={{ 
        display: 'block',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 600,
        color: 'var(--gray-700)',
        marginBottom: 'var(--space-2)'
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input 
          type="range" 
          min={min} 
          max={max} 
          value={value} 
          onChange={onChange}
          style={{
            width: '100%',
            height: '8px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--gray-200)',
            outline: 'none',
            appearance: 'none',
            cursor: 'pointer'
          }}
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--gradient-primary);
            cursor: pointer;
            box-shadow: var(--shadow-md);
            transition: all var(--transition-fast);
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: var(--shadow-lg);
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--gradient-primary);
            cursor: pointer;
            border: none;
            box-shadow: var(--shadow-md);
          }
        `}</style>
      </div>
      <div style={{ 
        marginTop: 'var(--space-2)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 600,
        color: 'var(--primary-green)',
        textAlign: 'center'
      }}>
        {value} {unit}
      </div>
    </div>
  );

  const modernSelect = (value, onChange, options, label) => (
    <div style={{ marginBottom: 'var(--space-4)' }}>
      <label style={{ 
        display: 'block',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 600,
        color: 'var(--gray-700)',
        marginBottom: 'var(--space-2)'
      }}>
        {label}
      </label>
      <select 
        value={value} 
        onChange={onChange}
        style={{
          width: '100%',
          padding: 'var(--space-3)',
          border: '2px solid var(--gray-200)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--white)',
          fontSize: 'var(--font-size-base)',
          color: 'var(--gray-800)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
          outline: 'none'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--primary-green)';
          e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--gray-200)';
          e.target.style.boxShadow = 'none';
        }}
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  return (
    <section className="dashboard-card" style={{ marginTop: 'var(--space-6)' }}>
      <div style={{ display: "flex", alignItems: "center", gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
        <span style={{ fontSize: '1.5rem' }}>🧪</span>
        <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 600, color: 'var(--gray-800)' }}>
          {t.simulator}
        </h3>
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-6)'
      }}>
        <div>
          {modernSlider(amount, e => setAmount(+e.target.value), 50, 300, "L", t.irrigationAmount)}
          {modernSlider(freq, e => setFreq(+e.target.value), 1, 7, "days", t.irrigationFreq)}
        </div>
        
        <div>
          {modernSelect(crop, e => setCrop(e.target.value), ["Paddy", "Wheat", "Maize", "Groundnut"], t.cropType)}
          {modernSelect(soil, e => setSoil(e.target.value), ["Loam", "Clay", "Sandy"], t.soilType)}
        </div>
      </div>
      
      <button 
        className="modern-btn" 
        style={{ 
          width: '100%',
          background: 'linear-gradient(135deg, var(--accent-purple), #a855f7)',
          fontSize: 'var(--font-size-base)',
          padding: 'var(--space-4) var(--space-6)'
        }} 
        onClick={() => onRun({ amount, freq, crop, soil })}
      >
        <span style={{ marginRight: 'var(--space-2)' }}>🚀</span>
        {t.runSim}
      </button>
    </section>
  );
}