import React, { useState } from 'react';

function Login({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.access) {
      localStorage.setItem('token', data.access);
      setMessage('Login successful!');
      setError('');
      if (onSuccess) onSuccess(); // Optional callback
    } else {
      setMessage('');
      setError(data.error || 'Login failed');
    }
  };

  return (
    <div className="login-component">
      <div className="login-header">
        <h2>Login</h2>
      </div>
      
      <div className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            id="username"
            type="text"
            placeholder="Enter your username" 
            value={username}
            onChange={e => setUsername(e.target.value)} 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Login;