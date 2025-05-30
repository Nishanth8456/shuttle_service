// src/Signup.js
import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/signup/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.access) {
      setMessage('Signup successful! You can now log in.');
    } else {
      setMessage(data.error || 'Signup failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleSignup}>Signup</button>
      <p>{message}</p>
    </div>
  );
}

export default Signup;
