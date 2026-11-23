import React from 'react';
import { Link } from 'react-router';

function Navbar({ appliedCount }) {
  return (
    <div className="navbar">
      <div className="nav-title">
        <Link to="/">Campus Placement Drive</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/companies">Companies</Link>
        <Link to="/applications">Applications ({appliedCount})</Link>
      </div>
    </div>
  );
}

export default Navbar;
