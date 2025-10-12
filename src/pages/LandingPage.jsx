import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle";
import logo from "../assets/react.svg";
import "../index.css";
import { getText } from "../i18n.js";

const LandingPage = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState(localStorage.getItem('language') || 'en');
  
  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = getText(lang);

  return (
    <div className="landing-container">
      <img src={logo} alt="Virtual Smart Agriculture Simulator" className="logo" />
      <h1>Virtual Smart Agriculture Simulator</h1>
      <p className="tagline">Virtual sensors. Real decisions. Lower costs.</p>
      <LanguageToggle lang={lang} setLang={handleLanguageChange} />
      <button className="proceed-btn" onClick={() => navigate("/login")}>
        Proceed to Login
      </button>
    </div>
  );
};

export default LandingPage;