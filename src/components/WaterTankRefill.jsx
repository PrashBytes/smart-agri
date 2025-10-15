import React, { useState, useEffect } from "react";

export default function WaterTankRefill({ open, t, onClose, onRefill, capacity, current }) {
  const [amount, setAmount] = useState(100);
  useEffect(() => { if (open) setAmount(Math.min(100, capacity - current)); }, [open, capacity, current]);
  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 50
    }}>
      <div className="card" style={{ maxWidth: 420, width: "100%" }}>
        <h3 style={{ marginTop: 0 }}>{t.refillTank}</h3>
        <p>{t.tankRefilled(amount)}</p>
        <input type="range" min="10" max={Math.max(10, capacity - current)} value={amount} onChange={e => setAmount(+e.target.value)} />
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <button className="btn btn-primary" onClick={() => onRefill(amount)}>{t.refillTank}</button>
          <button className="btn" onClick={onClose}>{t.close}</button>
        </div>
      </div>
    </div>
  );
}