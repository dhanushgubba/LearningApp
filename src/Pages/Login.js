import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ collegeid: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login request with data:', formData);
      const response = await fetch('http://43.204.234.158:5000/login/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setMessage('Login successful!');
        // Set authentication state using collegeid
        localStorage.setItem('collegeid', formData.collegeid); // Keep this
        localStorage.setItem('isAuthenticated', 'true'); // Ensure this matches PrivateRoute
        console.log('Navigating to /dashboard');
        navigate('/dashboard', { replace: true });
      } else {
        setMessage(data.message || data.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Fetch error:', err);
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
