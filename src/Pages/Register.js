import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    collegeid: '',
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRegister = async (e) => {
    e.preventDefault();

    const { name, email, contact, password, confirmPassword } = formData;

    // Frontend validation
    if (!name || !email || !contact || !password || !confirmPassword) {
      setStatusMessage('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setStatusMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch(
        'http://13.127.105.80:5000/register/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatusMessage('Registration successful!');
        setFormData({
          collegeid: '',
          name: '',
          email: '',
          contact: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        const errorData = await response.json();
        setStatusMessage(
          errorData.message || 'Registration failed. Please try again.'
        );
      }
    } catch (error) {
      setStatusMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Your Account</h2>
        <p>Join LearningHub and start your learning journey today!</p>
        <form onSubmit={handleAddRegister}>
          <div className="input-group">
            <input
              type="text"
              name="collegeid"
              placeholder="College ID"
              value={formData.collegeid}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="register-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Sign Up'}
          </button>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
          <p className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
