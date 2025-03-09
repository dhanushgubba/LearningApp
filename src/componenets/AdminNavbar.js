import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/adminhome">LearningHub</Link>
      </div>
      <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/adminhome" onClick={toggleMobileMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/login" className="login-btn" onClick={toggleMobileMenu}>
            Logout
          </Link>
        </li>
      </ul>
      <div className="menu-icon" onClick={toggleMobileMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default AdminNavbar;
