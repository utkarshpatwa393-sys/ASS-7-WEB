import React from 'react';
import { Link } from 'react-router';

function Home({ companies, myProfile }) {
  const totalCompanies = companies.length;

  const eligibleCompanies = companies.filter((company) => {
    const cgpaOk = myProfile.cgpa >= company.minCGPA;
    const branchOk = company.eligibleBranches.includes(myProfile.branch);
    return cgpaOk && branchOk;
  }).length;

  const appliedCompanies = companies.filter((company) => company.isApplied === true).length;

  return (
    <div className="page-box">
      <h1>Campus Placement Drive</h1>
      <p>Welcome to the campus placement portal. Check companies and apply.</p>

      <div className="profile-box">
        <h2>My Profile</h2>
        <p><b>Name:</b> {myProfile.name}</p>
        <p><b>Branch:</b> {myProfile.branch}</p>
        <p><b>CGPA:</b> {myProfile.cgpa}</p>
      </div>

      <div className="stats-box">
        <h2>Summary</h2>
        <div className="stats-row">
          <div className="stat-item">
            <h4>Total Companies</h4>
            <p className="stat-count">{totalCompanies}</p>
          </div>

          <div className="stat-item">
            <h4>Eligible Companies</h4>
            <p className="stat-count">{eligibleCompanies}</p>
          </div>

          <div className="stat-item">
            <h4>Applied Companies</h4>
            <p className="stat-count">{appliedCompanies}</p>
          </div>
        </div>
      </div>

      <div className="home-links">
        <Link to="/companies" className="btn-link">View Companies</Link>
        <Link to="/applications" className="btn-link">View Applications</Link>
      </div>
    </div>
  );
}

export default Home;
