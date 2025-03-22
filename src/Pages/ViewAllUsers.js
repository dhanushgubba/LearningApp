import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewAllUsers.css';

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching users' data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://13.201.18.238:5000/admin/users'
        );
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="viewallusers-container">
      <div className="viewallusers-title">
        <h1>View All Users</h1>
      </div>
      <div className="viewallusers-table">
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.collegeid}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAllUsers;
