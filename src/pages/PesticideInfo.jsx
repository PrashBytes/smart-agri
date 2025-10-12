import React from "react";

export default function PesticideInfo({ t }) {
  return (
    <main className="container">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>{t.pesticideInfo}</h2>
        <p style={{ color: "var(--muted)" }}>
          Clear, crop-specific guidance. Choose products safely, follow dosage and safety steps.
        </p>

        <div className="grid grid-2" style={{ marginTop: 8 }}>
          <div className="card">
            <h3>Rice (Paddy)</h3>
            <ul>
              <li><b>Risk:</b> Brown planthopper if humidity is high</li>
              <li><b>Action:</b> Use recommended insecticide; rotate actives to avoid resistance</li>
              <li><b>Dosage:</b> Follow product label strictly per acre</li>
              <li><b>Safety:</b> Mask, gloves; avoid windy spray; keep away from children</li>
            </ul>
          </div>
          <div className="card">
            <h3>Wheat</h3>
            <ul>
              <li><b>Risk:</b> Aphids when cool and humid</li>
              <li><b>Action:</b> Use recommended insecticide; spot‑spray localized patches</li>
              <li><b>Dosage:</b> As per label; do not exceed</li>
              <li><b>Safety:</b> PPE, proper dilution, avoid water sources</li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <h3>General guidance</h3>
          <ul>
            <li><b>Identification:</b> Confirm pest using local ag extension resources</li>
            <li><b>Timing:</b> Spray early morning/evening with calm wind</li>
            <li><b>Rotation:</b> Alternate active ingredients to reduce resistance</li>
            <li><b>Post‑spray:</b> Record date, area, product, dosage</li>
          </ul>
        </div>
      </div>
    </main>
  );
}   