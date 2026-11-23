import React from 'react';
import { Link } from 'react-router';

// Home page: shows title, introduction, student profile, and summary statistics
function Home({ companies, myProfile }) {
  // Total companies count
  const totalCompanies = companies.length;

  // Eligible companies count based on student profile
  const eligibleCompanies = companies.filter(
    (c) =>
      myProfile.cgpa >= c.minCGPA &&
      c.eligibleBranches.includes(myProfile.branch)
  ).length;

  // Applied companies count
  const appliedCompanies = companies.filter((c) => c.isApplied).length;

  return (
    <div className="container">
      <div className="page-header">
        <h1>Campus Placement Drive 2026</h1>
        <p className="subtitle">
          Welcome to the official campus placement portal. Check visiting companies, review eligibility requirements, and track your applications.
        </p>
      </div>

      {/* Student Profile Section */}
      <div className="section-box profile-box">
        <h2>👤 Student Profile</h2>
        <div className="profile-details">
          <p><strong>Name:</strong> {myProfile.name}</p>
          <p><strong>Branch:</strong> {myProfile.branch}</p>
          <p><strong>CGPA:</strong> {myProfile.cgpa}</p>
        </div>
      </div>

      {/* Drive Summary Statistics */}
      <div className="section-box">
        <h2>📊 Placement Summary</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Companies</h3>
            <p className="stat-number">{totalCompanies}</p>
          </div>
          <div className="stat-card stat-card-green">
            <h3>Eligible Companies</h3>
            <p className="stat-number">{eligibleCompanies}</p>
          </div>
          <div className="stat-card stat-card-blue">
            <h3>Applied Companies</h3>
            <p className="stat-number">{appliedCompanies}</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Links */}
      <div className="quick-links">
        <Link to="/companies" className="btn btn-primary">
          Explore All Companies
        </Link>
        <Link to="/applications" className="btn btn-secondary">
          View My Applications ({appliedCompanies})
        </Link>
      </div>
    </div>
  );
}

export default Home;
