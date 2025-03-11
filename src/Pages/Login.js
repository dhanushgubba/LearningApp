import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({ collegeid: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login request with data:', formData);
      const response = await fetch('http://13.127.105.80:5000/login/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]); // Log headers
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response text:', errorText);
        throw new Error(
          `HTTP error! Status: ${response.status}, Details: ${errorText}`
        );
      }
      const data = await response.json();
      console.log('Response data:', data);
      if (data.error) {
        setMessage(data.error + (data.details ? `: ${data.details}` : ''));
      } else {
        setMessage(data.message || 'Login successful');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="collegeid"
          placeholder="College ID"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
