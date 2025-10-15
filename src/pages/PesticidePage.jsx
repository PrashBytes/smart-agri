import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const pesticides = [
  { name: "Neem Oil", use: "Aphids, Whiteflies", desc: "Natural, safe for most crops." },
  { name: "Imidacloprid", use: "Leafhoppers, Aphids", desc: "Use with caution, follow label." },
  { name: "Copper Oxychloride", use: "Fungal diseases", desc: "Apply after rain or at first sign." },
];

const PesticidePage = () => {
  const navigate = useNavigate();
  return (
    <div className="info-page">
      <h2>Recommended Pesticides</h2>
      <ul>
        {pesticides.map((p, i) => (
          <li key={i}>
            <strong>{p.name}</strong> <br />
            <span>For: {p.use}</span> <br />
            <span>{p.desc}</span>
          </li>
        ))}
      </ul>
      <button className="proceed-btn" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
};

export default PesticidePage;