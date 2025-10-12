import React, { useState, useMemo } from "react";
import DailyAdviceCard from "../components/DailyAdviceCard.jsx";
import ChartTrend from "../components/ChartTrend.jsx";
import ActionButtons from "../components/ActionButtons.jsx";
import ScenarioSimulator from "../components/ScenarioSimulator.jsx";
import WaterTankRefill from "../components/WaterTankRefill.jsx";
import { getText } from "../i18n.js";

export default function DashBoard({ t, lang }) {
  const tLang = getText(lang);

  // Virtual sensor states
  const [soilMoisture, setSoilMoisture] = useState(18); // %
  const [tankLiters, setTankLiters] = useState(200); // L
  const [tankCapacity] = useState(250); // L
  const [temperature, setTemperature] = useState(34); // °C
  const [humidity, setHumidity] = useState(42); // %
  const [nutrients, setNutrients] = useState({ N: 3, P: 2, K: 4 }); // index 1-5
  const [pestRisk, setPestRisk] = useState("Medium");
  const [daysSinceSowing, setDaysSinceSowing] = useState(28);
  const [weather, setWeather] = useState([
    { day: "Today", type: "sun", rainMM: 0 },
    { day: "Tomorrow", type: "cloudRain", rainMM: 12 },
    { day: "Day 3", type: "wind", rainMM: 0 }
  ]);

  const [refillOpen, setRefillOpen] = useState(false);
  const [history, setHistory] = useState({
    moisture: [32, 28, 25, 22, 18],
    tank: [250, 200, 180, 220, 200],
    rainfall: [0, 6, 0, 12, 0]
  });

  const litersToIrrigate = 150;
  const status = useMemo(() => soilMoisture < 25 ? "urgent" : soilMoisture < 40 ? "warn" : "good", [soilMoisture]);

  const handleIrrigate = () => {
    if (tankLiters <= 0) { setRefillOpen(true); return; }
    const useL = Math.min(litersToIrrigate, tankLiters);
    const addMoist = Math.floor(useL / 10);
    setTankLiters(tankLiters - useL);
    setSoilMoisture(Math.min(100, soilMoisture + addMoist));
    setHistory(h => ({
      ...h,
      moisture: [...h.moisture.slice(-4), Math.min(100, soilMoisture + addMoist)],
      tank: [...h.tank.slice(-4), tankLiters - useL]
    }));
  };

  const handleFertilizer = () => {
    setNutrients({
      N: Math.min(5, nutrients.N + 1),
      P: Math.min(5, nutrients.P + 1),
      K: Math.min(5, nutrients.K + 1)
    });
  };

  const handlePestCheck = () => {
    const risk = humidity > 60 || daysSinceSowing > 40 ? "High" : humidity > 40 ? "Medium" : "Low";
    setPestRisk(risk);
  };

  const onRefill = (liters) => {
    setTankLiters(Math.min(tankCapacity, tankLiters + liters));
    setRefillOpen(false);
  };

  // Helper function for tank status
  const getTankStatus = () => {
    const pct = Math.round((tankLiters / tankCapacity) * 100);
    const tone = pct <= 10 ? "urgent" : pct <= 35 ? "warn" : "good";
    const badgeClass = tone === "urgent" ? "status-urgent" : tone === "warn" ? "status-warn" : "status-good";
    const badgeText = tone === "urgent" ? tLang.urgent : tone === "warn" ? tLang.caution : tLang.good;
    return { badgeClass, badgeText };
  };

  return (
    <main>
      <div className="dashboard-container">
        <DailyAdviceCard
          t={tLang}
          status={status}
          text={tLang.irrigateToday(soilMoisture, litersToIrrigate, Math.max(0, tankLiters - litersToIrrigate))}
        />

        {/* Modern Sensor Grid */}
        <div className="dashboard-grid">
          {/* Soil moisture */}
          <div className="dashboard-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <div style={{ fontSize: "2rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>💧</div>
                <h3 style={{ margin: 0, fontWeight: 600, color: "var(--gray-800)" }}>{tLang.soilMoisture}</h3>
              </div>
              <span className={`status-badge ${status === "urgent" ? "status-urgent" : status === "warn" ? "status-warn" : "status-good"}`}>
                {status === "urgent" ? tLang.urgent : status === "warn" ? tLang.caution : tLang.good}
              </span>
            </div>
            <div style={{ marginTop: "var(--space-3)", fontSize: "2.5rem", fontWeight: 800, color: "var(--primary-green)" }}>
              {soilMoisture}%
            </div>
            <div style={{ marginTop: "var(--space-2)", color: "var(--gray-600)", fontSize: "var(--font-size-sm)" }}>
              {tLang.moistureAdvice(soilMoisture, litersToIrrigate)}
            </div>
            <div className="moisture-indicator" style={{ marginTop: "var(--space-4)" }}>
              <div className="moisture-bar">
                <div 
                  className="moisture-fill" 
                  style={{ width: `${soilMoisture}%`, background: status === "urgent" ? "#ef4444" : status === "warn" ? "var(--accent-orange)" : "var(--primary-green)" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Water tank */}
          <div className="dashboard-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <div style={{ fontSize: "2rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>🚰</div>
                <h3 style={{ margin: 0, fontWeight: 600, color: "var(--gray-800)" }}>{tLang.waterTank}</h3>
              </div>
              <span className={`status-badge ${getTankStatus().badgeClass}`}>
                {getTankStatus().badgeText}
              </span>
            </div>
            <div style={{ marginTop: "var(--space-3)", fontSize: "2.5rem", fontWeight: 800, color: "var(--secondary-blue)" }}>
              {Math.round((tankLiters / tankCapacity) * 100)}%
            </div>
            <div style={{ marginTop: "var(--space-2)", color: "var(--gray-600)", fontSize: "var(--font-size-sm)" }}>
              {tLang.tankAdvice(Math.round((tankLiters / tankCapacity) * 100))}
            </div>
            <div className="tank-visual" style={{ marginTop: "var(--space-4)" }}>
              <div className="tank-container">
                <div 
                  className="tank-water" 
                  style={{ height: `${Math.round((tankLiters/tankCapacity)*100)}%` }}
                />
              </div>
            </div>
            <button 
              className="btn modern-btn" 
              onClick={() => setRefillOpen(true)}
              style={{ marginTop: "var(--space-4)", width: "100%" }}
            >
              {tLang.refillTank}
            </button>
          </div>

          {/* Weather */}
          <div className="dashboard-card">
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <div style={{ fontSize: "2rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>🌦️</div>
              <h3 style={{ margin: 0, fontWeight: 600, color: "var(--gray-800)" }}>{tLang.weather}</h3>
            </div>
            <div style={{ marginTop: "var(--space-4)" }}>
              {weather.map((w, i) => (
                <div key={i} className="weather-item" style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  padding: "var(--space-2) 0",
                  borderBottom: i < weather.length - 1 ? "1px solid var(--gray-200)" : "none"
                }}>
                  <span style={{ color: "var(--gray-600)", fontSize: "var(--font-size-sm)" }}>{w.day}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                    <span style={{ fontSize: "1.2rem" }}>
                      {w.type === "sun" ? "☀️" : w.type === "cloudRain" ? "🌧️" : "🌬️"}
                    </span>
                    <span style={{ fontWeight: 600, color: "var(--gray-800)" }}>{w.rainMM} mm</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Temp & Humidity */}
          <div className="dashboard-card">
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <div style={{ fontSize: "2rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>🌡️</div>
              <h3 style={{ margin: 0, fontWeight: 600, color: "var(--gray-800)" }}>{tLang.tempHumidity}</h3>
            </div>
            <div style={{ marginTop: "var(--space-3)", fontSize: "2rem", fontWeight: 800, color: "var(--accent-orange)" }}>
              {temperature}°C / {humidity}%
            </div>
            <div style={{ marginTop: "var(--space-2)", color: "var(--gray-600)", fontSize: "var(--font-size-sm)" }}>
              {temperature > 35 ? "High temp — monitor evap." : "Comfortable range."}
            </div>
            <div className="temp-humidity-visual" style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-4)" }}>
              <div className="temp-indicator">
                <div className="temp-bar">
                  <div className="temp-fill" style={{ height: `${Math.min(100, (temperature / 50) * 100)}%` }}></div>
                </div>
                <span style={{ fontSize: "var(--font-size-xs)", color: "var(--gray-500)" }}>Temp</span>
              </div>
              <div className="humidity-indicator">
                <div className="humidity-bar">
                  <div className="humidity-fill" style={{ height: `${humidity}%` }}></div>
                </div>
                <span style={{ fontSize: "var(--font-size-xs)", color: "var(--gray-500)" }}>Humidity</span>
              </div>
            </div>
          </div>

          {/* Nutrients */}
          <div className="dashboard-card">
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <div style={{ fontSize: "2rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>🌿</div>
              <h3 style={{ margin: 0, fontWeight: 600, color: "var(--gray-800)" }}>{tLang.nutrientIndex}</h3>
            </div>
            <div style={{ marginTop: "var(--space-3)", fontSize: "1.5rem", fontWeight: 700, color: "var(--primary-green)" }}>
              N:{nutrients.N} P:{nutrients.P} K:{nutrients.K}
            </div>
            <div style={{ marginTop: "var(--space-2)", color: "var(--gray-600)", fontSize: "var(--font-size-sm)" }}>
              {tLang.nutrientAdvice(nutrients.N, nutrients.P, nutrients.K)}
            </div>
            <div className="nutrient-bars" style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-2)" }}>
              <div className="nutrient-bar">
                <div className="nutrient-fill" style={{ height: `${(nutrients.N / 5) * 100}%`, background: "#10b981" }}></div>
                <span>N</span>
              </div>
              <div className="nutrient-bar">
                <div className="nutrient-fill" style={{ height: `${(nutrients.P / 5) * 100}%`, background: "#3b82f6" }}></div>
                <span>P</span>
              </div>
              <div className="nutrient-bar">
                <div className="nutrient-fill" style={{ height: `${(nutrients.K / 5) * 100}%`, background: "#f59e0b" }}></div>
                <span>K</span>
              </div>
            </div>
          </div>

          {/* Pest risk */}
          <div className="dashboard-card">
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <div style={{ fontSize: "2rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>🐛</div>
              <h3 style={{ margin: 0, fontWeight: 600, color: "var(--gray-800)" }}>{tLang.pestRisk}</h3>
            </div>
            <div style={{ marginTop: "var(--space-3)", fontSize: "2rem", fontWeight: 800, color: pestRisk === "High" ? "#ef4444" : pestRisk === "Medium" ? "var(--accent-orange)" : "var(--primary-green)" }}>
              {pestRisk}
            </div>
            <div style={{ marginTop: "var(--space-2)", color: "var(--gray-600)", fontSize: "var(--font-size-sm)" }}>
              {tLang.pestAdvice(pestRisk)}
            </div>
            <a 
              className="btn modern-btn" 
              href="/pesticides"
              style={{ marginTop: "var(--space-4)", width: "100%", textDecoration: "none", display: "inline-block", textAlign: "center" }}
            >
              {tLang.seePesticides}
            </a>
          </div>

          {/* Crop stage */}
          <div className="dashboard-card">
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <div style={{ fontSize: "2rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>🌱</div>
              <h3 style={{ margin: 0, fontWeight: 600, color: "var(--gray-800)" }}>{tLang.cropStage}</h3>
            </div>
            <div style={{ marginTop: "var(--space-3)", fontSize: "2.5rem", fontWeight: 800, color: "var(--accent-purple)" }}>
              {daysSinceSowing} days
            </div>
            <div style={{ marginTop: "var(--space-2)", color: "var(--gray-600)", fontSize: "var(--font-size-sm)" }}>
              {tLang.cropStageLabel(daysSinceSowing)}
            </div>
            <div className="crop-progress" style={{ marginTop: "var(--space-4)" }}>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(100, (daysSinceSowing / 120) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <ChartTrend t={tLang} history={history} weather={weather} />

        {/* Actions */}
        <ActionButtons
          t={tLang}
          onIrrigate={handleIrrigate}
          onFertilize={handleFertilizer}
          onPestCheck={handlePestCheck}
          tankLiters={tankLiters}
        />

        {/* Simulator */}
        <ScenarioSimulator
          t={tLang}
          onRun={({ amount, freq, crop, soil }) => {
            setSoilMoisture(m => Math.max(0, Math.min(100, m + Math.floor(amount / 12) - (freq > 3 ? 3 : 1))));
            setTankLiters(l => Math.max(0, l - amount));
            setHistory(h => ({
              ...h,
              rainfall: [...h.rainfall.slice(-4), crop === "Paddy" ? 10 : 2]
            }));
          }}
        />

        {/* Savings & Impact */}
        <section className="card" style={{ marginTop: 12 }}>
          <h3 style={{ marginTop: 0 }}>{tLang.savingsImpact}</h3>
          <div className="grid grid-2">
            <div className="card">
              <div><b>{tLang.waterSaved}:</b></div>
              <div style={{ fontSize: 18 }}>{Math.max(0, 120 - Math.floor(soilMoisture / 2))}</div>
            </div>
            <div className="card">
              <div><b>{tLang.fertSaved}:</b></div>
              <div style={{ fontSize: 18 }}>{Math.max(0, (nutrients.N + nutrients.P + nutrients.K) > 12 ? 0 : 3)}</div>
            </div>
            <div className="card">
              <div><b>{tLang.costSaved}:</b></div>
              <div style={{ fontSize: 18 }}>₹ {Math.max(0, 600 - (tankLiters < 50 ? 150 : 50))}</div>
            </div>
            <div className="card">
              <div><b>{tLang.envImpact}:</b></div>
              <div style={{ fontSize: 18 }}>
                CO₂ down ~{Math.round(soilMoisture / 3)}% / Water footprint down ~{Math.round(tankLiters / 10)}%
              </div>
            </div>
          </div>
        </section>

        {/* Refill modal */}
        <WaterTankRefill
          open={refillOpen}
          t={tLang}
          onClose={() => setRefillOpen(false)}
          onRefill={onRefill}
          capacity={tankCapacity}
          current={tankLiters}
        />
      </div>
    </main>
  );
}