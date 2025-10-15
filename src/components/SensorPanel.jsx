import React from "react";

const icons = {
  soil: "💧",
  water: "🚰",
  weather: "🌦️",
  tempHumidity: "🌡️💦",
  nutrient: "🌿",
  pest: "🐛",
  growth: "🌱"
};

const sensorDetails = {
  soil: {
    label: "Soil Moisture",
    value: 18,
    advice: value => value < 20 ? "Soil is dry. Irrigate today." : "Soil moisture is good."
  },
  water: {
    label: "Water Tank",
    value: 25,
    advice: value => value < 30 ? "Tank low. Refill soon." : "Tank level is sufficient."
  },
  weather: {
    label: "Weather (3-day)",
    value: "🌦️ ☀️ 🌧️",
    advice: () => "Rain expected in 2 days."
  },
  tempHumidity: {
    label: "Temp & Humidity",
    value: "32°C / 60%",
    advice: () => "Good for crop growth."
  },
  nutrient: {
    label: "Nutrient Index (NPK)",
    value: "N: Low, P: Good, K: Good",
    advice: () => "Apply Nitrogen fertilizer."
  },
  pest: {
    label: "Pest/Disease Risk",
    value: "High",
    advice: () => "High risk. Use recommended pesticide."
  },
  growth: {
    label: "Crop Growth Stage",
    value: "28 days (Vegetative)",
    advice: () => "Monitor for pests and irrigate regularly."
  }
};

const SensorPanel = ({ type }) => {
  const sensor = sensorDetails[type];
  return (
    <div className="sensor-panel">
      <span className="sensor-icon">{icons[type]}</span>
      <div>
        <h4>{sensor.label}</h4>
        <p>{sensor.advice(sensor.value)} <span style={{ fontWeight: "bold" }}>{sensor.value}</span></p>
      </div>
    </div>
  );
};

export default SensorPanel;