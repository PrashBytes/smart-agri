import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any email/password
      if (formData.email && formData.password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        navigate('/dashboard');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="signin-container">
      {/* Background Elements */}
      <div className="signin-bg-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>

      <div className="signin-content">
        <div className="signin-card">
          {/* Logo/Brand Section */}
          <div className="signin-header">
            <div className="brand-logo">
              <div className="logo-icon">🌱</div>
              <h1 className="brand-name">Smart Agri</h1>
            </div>
            <p className="signin-subtitle">Welcome back! Please sign in to your account</p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className={`signin-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <span className="button-icon">🚀</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Additional Options */}
          <div className="signin-footer">
            <div className="divider">
              <span>or</span>
            </div>
            
            <div className="social-signin">
              <button className="social-button google">
                <span className="social-icon">🔍</span>
                Continue with Google
              </button>
              <button className="social-button github">
                <span className="social-icon">🐙</span>
                Continue with GitHub
              </button>
            </div>

            <p className="signup-link">
              Don't have an account? 
              <a href="#" className="signup-button">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;