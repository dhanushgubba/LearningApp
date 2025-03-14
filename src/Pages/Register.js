import React, { useState } from 'react';
import './Register.css';
function Register() {
  const [formData, setFormData] = useState({
    collegeid: '',
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'http://43.204.219.90:5000/register/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      setMessage(data.message || data.error || 'Unknown error');
    } catch (err) {
      setMessage('Error connecting to backend: ' + err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
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
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              name="contact"
              placeholder="Contact"
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

          <div className="input-group">
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
        {message && <div className="message-box">{message}</div>}
      </div>
    </div>
  );
}

export default Register;
