import React, { useState } from 'react';
import './App.css';

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
    const response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: loginUser, password: loginPass })
    });
    const data = await response.json();
    if (data.access) {
      localStorage.setItem('token', data.access);
      setMessage('Login successful!');
      setShowLogin(false);
    } else {
      setLoginError(data.error || 'Login failed');
    }
  };

  const handleSignup = async () => {
    if (signupPass !== signupConfirm) {
      setSignupError('Passwords do not match');
      return;
    }
    const response = await fetch('http://127.0.0.1:8000/api/signup/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: signupUser, password: signupPass })
    });
    const data = await response.json();
    if (data.access) {
      setMessage('Signup successful! You can now log in.');
      setShowSignup(false);
    } else {
      setSignupError(data.error || 'Signup failed');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Shuttle Service</h1>
        <div className="auth-buttons">
          <button onClick={() => setShowLogin(true)}>Login</button>
          <button onClick={() => setShowSignup(true)}>Signup</button>
        </div>
      </header>

      <main className="content">
        <h2>Welcome to our Shuttle Service</h2>
        <p>Your journey starts here. Choose from a variety of transportation options.</p>
        {message && <p className="success">{message}</p>}
      </main>

      <footer>
        <p>&copy; 2025 Shuttle Service. All rights reserved.</p>
      </footer>

      {showLogin && (
        <div className="modal">
          <h2>Login</h2>
          <input placeholder="Username" onChange={e => setLoginUser(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setLoginPass(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          {loginError && <p className="error">{loginError}</p>}
          <button onClick={() => setShowLogin(false)}>Close</button>
        </div>
      )}

      {showSignup && (
        <div className="modal">
          <h2>Sign Up</h2>
          <input placeholder="Username" onChange={e => setSignupUser(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setSignupPass(e.target.value)} />
          <input type="password" placeholder="Confirm Password" onChange={e => setSignupConfirm(e.target.value)} />
          <button onClick={handleSignup}>Sign Up</button>
          {signupError && <p className="error">{signupError}</p>}
          <button onClick={() => setShowSignup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
