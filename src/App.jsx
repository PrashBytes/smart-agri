import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { getText } from './i18n.js';

// Import pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignInPage from './pages/SignInPage';
import Dashboard from "./pages/DashBoard.jsx";
import PesticideInfo from './pages/PesticideInfo';
import MoreInfoPage from './pages/MoreInfoPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
    
    const savedLang = localStorage.getItem('language') || 'en';
    setLang(savedLang);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
  };

  const t = getText(lang);

  return (
    <div className="App">
      {/* Modern Header - only show when authenticated */}
      {isAuthenticated && (
        <header className="modern-header">
          <div className="brand-section">
            <h1 className="brand-title">Smart Agri</h1>
            <p className="brand-tagline">Intelligent Agriculture Solutions</p>
          </div>
          
          <nav className="nav-section">
            <a href="/dashboard" className="nav-link">Dashboard</a>
            <a href="/pesticides" className="nav-link">Pesticides</a>
            <a href="/more" className="nav-link">More Info</a>
          </nav>

          <div className="header-actions">
            <button onClick={handleLogout} className="logout-btn">
              <span className="logout-icon">🚪</span>
              Logout
            </button>
          </div>
        </header>
      )}

      {/* Routes */}
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage t={t} onAuthed={handleLogin} />} 
        />
        <Route 
          path="/signin" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignInPage />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard t={t} lang={lang} /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/pesticides" 
          element={isAuthenticated ? <PesticideInfo t={t} /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/more" 
          element={isAuthenticated ? <MoreInfoPage /> : <Navigate to="/signin" />} 
        />
      </Routes>
    </div>
  );
}

export default App;