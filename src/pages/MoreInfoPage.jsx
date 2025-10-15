import React from "react";

export default function MoreInfo({ t }) {
  return (
    <main className="container">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>{t.moreInfo}</h2>
        <div className="grid grid-2">
          <div className="card">
            <h3>How decisions work</h3>
            <p>- Sensors simulate moisture, tank, weather, nutrients, pests.</p>
            <p>- Advice combines values to show clear actions.</p>
            <p>- Tune scenarios and instantly see impact.</p>
          </div>
          <div className="card">
            <h3>Localization</h3>
            <p>- English / Tamil / Hindi toggle.</p>
            <p>- Icons + colors for quick understanding.</p>
            <p>- Mobile-first UI with big touch targets.</p>
          </div>
        </div>
      </div>
    </main>
  );
}