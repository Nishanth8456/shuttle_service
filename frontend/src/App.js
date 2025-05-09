import React, { useState } from 'react';
import './App.css';
import Login from './Login';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [message, setMessage] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [signupUser, setSignupUser] = useState('');
  const [signupPass, setSignupPass] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUser, password: loginPass })
      });
  
      const data = await response.json(); // try will catch if invalid JSON
  
      if (response.ok && data.access) {
        localStorage.setItem('token', data.access);
        setMessage('Login successful!');
        setShowLogin(false);
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (error) {
      setLoginError('Server error or invalid response.');
      console.error('Login failed:', error);
    }
  };
  
  const handleSignup = async () => {
    if (signupPass !== signupConfirm) {
      setSignupError('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: signupUser, password: signupPass })
      });
  
      const data = await response.json();
  
      if (response.ok && data.access) {
        setMessage('Signup successful! You can now log in.');
        setShowSignup(false);
      } else {
        setSignupError(data.error || 'Signup failed');
      }
    } catch (error) {
      setSignupError('Server error or invalid response.');
      console.error('Signup failed:', error);
    }
  };
  
  

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 19H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-3m-7-2v-6m0 0l3 3m-3-3l-3 3" />
              </svg>
            </div>
            <h1>Shuttle Service</h1>
          </div>
          <div className="auth-buttons">
            <button className="login-btn" onClick={() => setShowLogin(true)}>Login</button>
            <button className="signup-btn" onClick={() => setShowSignup(true)}>Signup</button>
          </div>
        </div>
      </header>
      
      <main className="content">
        <div className="welcome-card">
          <h2>Welcome to our Shuttle Service</h2>
          <div className="welcome-banner">
            <div className="banner-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p>Your journey starts here. Choose from a variety of transportation options.</p>
          </div>
          
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Fast & Reliable</h3>
              <p>Our shuttles run on time, every time.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3>Comfortable</h3>
              <p>Modern fleet with all the amenities.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Affordable</h3>
              <p>Great rates with frequent traveler discounts.</p>
            </div>
          </div>
          
          {message && <p className="success">{message}</p>}
        </div>
      </main>
      
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Shuttle Service</h3>
            <p>Your trusted transportation partner since 2020.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Services</a></li>
              <li><a href="#">Routes</a></li>
              <li><a href="#">Schedules</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>123 Transport Ave<br />Transit City, TC 12345<br />info@shuttleservice.com</p>
          </div>
          <div className="copyright">
            <p>&copy; 2025 Shuttle Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Login</h2>
              <button className="close-btn" onClick={() => setShowLogin(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Username</label>
                <input 
                  placeholder="Username" 
                  onChange={e => setLoginUser(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="Password" 
                  onChange={e => setLoginPass(e.target.value)} 
                />
              </div>
              <button className="submit-btn" onClick={handleLogin}>Login</button>
              {loginError && <p className="error">{loginError}</p>}
              <div className="modal-footer">
                <p>Don't have an account? <button className="link-btn" onClick={() => {setShowLogin(false); setShowSignup(true);}}>Sign up</button></p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showSignup && (
        <div className="modal-overlay" onClick={() => setShowSignup(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Sign Up</h2>
              <button className="close-btn" onClick={() => setShowSignup(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Username</label>
                <input 
                  placeholder="Username" 
                  onChange={e => setSignupUser(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="Password" 
                  onChange={e => setSignupPass(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  onChange={e => setSignupConfirm(e.target.value)} 
                />
              </div>
              <button className="submit-btn" onClick={handleSignup}>Sign Up</button>
              {signupError && <p className="error">{signupError}</p>}
              <div className="modal-footer">
                <p>Already have an account? <button className="link-btn" onClick={() => {setShowSignup(false); setShowLogin(true);}}>Login</button></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;