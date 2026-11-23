import React from 'react';
import { Link } from 'react-router';

// Reusable navigation bar with live applied count
function Navbar({ appliedCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-title">
          🎓 Campus Placement Portal
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/companies" className="nav-link">Companies</Link>
          <Link to="/applications" className="nav-link">
            Applications <span className="nav-count">({appliedCount})</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
