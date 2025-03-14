import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ collegeid: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://43.204.219.90:5000/login/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful!');
        window.location.href = '/dashboard';
      } else {
        setMessage(data.message || data.error || 'Unknown error');
      }
    } catch (err) {
      setMessage('Error connecting to backend: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              name="collegeid"
              placeholder="College ID"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p>{message}</p>
        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
