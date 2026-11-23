import React from 'react';
import { Link } from 'react-router';
import CompanyCard from '../components/CompanyCard';

// Applications page: displays only companies where student has applied
function Applications({ companies, myProfile, onToggleApply }) {
  // Get applied companies using filter()
  const appliedCompanies = companies.filter((c) => c.isApplied);

  return (
    <div className="container">
      <div className="page-header">
        <h2>My Submitted Applications</h2>
        <p className="subtitle">
          Review and manage the campus placement drives you have applied to.
        </p>
      </div>

      {/* Show applied companies or empty state */}
      {appliedCompanies.length === 0 ? (
        <div className="empty-box">
          <h3>No applications yet</h3>
          <p>You have not applied to any companies yet.</p>
          <Link to="/companies" className="btn btn-primary">
            Explore Companies & Apply
          </Link>
        </div>
      ) : (
        <div className="cards-grid">
          {appliedCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              myProfile={myProfile}
              onToggleApply={onToggleApply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;
