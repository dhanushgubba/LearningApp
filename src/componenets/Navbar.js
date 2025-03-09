import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">LearningHub</Link>
      </div>
      <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" onClick={toggleMobileMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/mcourses" onClick={toggleMobileMenu}>
            Courses
          </Link>
        </li>
        <li>
          <Link to="/login" className="login-btn" onClick={toggleMobileMenu}>
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/adminlogin"
            className="login-btn"
            onClick={toggleMobileMenu}
          >
            Admin Login
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

export default Navbar;
