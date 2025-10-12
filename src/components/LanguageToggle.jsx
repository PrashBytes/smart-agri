import React from "react";

export default function LanguageToggle({ lang, setLang }) {
  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className="btn"
      aria-label="Language"
      style={{ background: "rgba(99,102,241,0.12)" }}
    >
      <option value="en">English</option>
      <option value="ta">தமிழ்</option>
      <option value="hi">हिंदी</option>
    </select>
  );
}