import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminHome.css';

const AdminHome = () => {
  const [adminName, setAdminName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/viewall/users');
        if (response.data && response.data.length > 0) {
          setAdminName(response.data[0].name);
        } else {
          setAdminName('Admin');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="adminhome-container">
      <div className="adminhome-title">
        <h1>
          {getGreeting()}, {loading ? 'Loading...' : adminName}!
        </h1>
        <p>Welcome to the Learning Hub</p>
      </div>

      <div className="adminhome-content">
        <div className="card">
          <h2>Manage Users</h2>
          <p>View, edit, or delete user profiles easily.</p>
          <button>
            <a href="/viewallusers">Go to Users</a>
          </button>
        </div>
        <div className="card">
          <h2>Add Users</h2>
          <p>Add the users to the database easily.</p>
          <button>
            <a href="/addusers">Add Users</a>
          </button>
        </div>
        <div className="card">
          <h2>Add Courses</h2>
          <p>Add the different types of courses.</p>
          <button>
            <a href="/addcourses">Add Courses</a>
          </button>
        </div>
        <div className="card">
          <h2>View Documents</h2>
          <p>Access and manage documents efficiently.</p>
          <button>Go to Documents</button>
        </div>

        <div className="card">
          <h2>Settings</h2>
          <p>Customize your admin preferences.</p>
          <button>Go to Settings</button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
