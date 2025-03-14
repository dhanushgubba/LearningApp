import React, { useState } from 'react';
import './AddUsers.css';
const AddUsers = () => {
  const [formData, setFormData] = useState({
    collegeid: '',
    name: '',
    email: '',
    contact: '',
    password: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    const { collegeid, name, email, contact, password } = formData;
    if (!collegeid || !name || !email || !contact || !password) {
      setStatusMessage('All Fields are required');
      return;
    }
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch('http://13.127.102.201:5000/add/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatusMessage('Successfully Added New User');
        setFormData({
          collegeid: '',
          name: '',
          email: '',
          contact: '',
          password: '',
        });
      } else {
        const errorData = await response.json();
        setStatusMessage(
          errorData.message || 'Failed to Add User. Please try again.'
        );
      }
    } catch (error) {
      setStatusMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addusers-container">
      <div className="addusers-title">
        <h1>Add Users</h1>

        <form onSubmit={handleAddUser}>
          <div className="input-group">
            <input
              type="text"
              id="collegeid"
              name="collegeid"
              placeholder="Enter college ID"
              value={formData.collegeid}
              onChange={handleChange}
              aria-label="College ID"
              required
            />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
              aria-label="Full Name"
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email of the User"
              value={formData.email}
              onChange={handleChange}
              aria-label="Email"
              required
            />
            <input
              type="text"
              id="contact"
              name="contact"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={handleChange}
              aria-label="Contact Number"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              aria-label="Password"
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding User ...' : 'Add User'}
            </button>
          </div>
        </form>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default AddUsers;
