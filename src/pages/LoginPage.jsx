import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ t, onAuthed }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (email && password) {
      onAuthed();
      navigate("/dashboard");
    }
  };

  return (
    <main className="container">
      <form className="card" onSubmit={submit}>
        <h2 style={{ marginTop: 0 }}>{t.login}</h2>
        <label>{t.email}</label>
        <input
          type="email"
          value={email}
          placeholder="farmer@example.com"
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, borderRadius: 8, marginTop: 4, marginBottom: 10 }}
        />
        <label>{t.password}</label>
        <input
          type="password"
          value={password}
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, borderRadius: 8, marginTop: 4 }}
        />
        <button className="btn btn-primary" style={{ marginTop: 12 }} type="submit">
          {t.enter}
        </button>
      </form>
    </main>
  );
}