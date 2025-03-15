import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setStatusMessage('All Fields are required');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(
        'http://13.201.74.143:5000/adminlogin/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userEmail', email);
        setStatusMessage('Login Successful');
        window.location.href = '/adminhome';
      } else {
        setStatusMessage(data.error || 'Login Failed');
      }
    } catch (err) {
      setStatusMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="adminlogin-container">
      <div className="adminlogin-card">
        <h2>Welcome Back, Admin!</h2>
        <p>Please login to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {statusMessage && <p>{statusMessage}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
