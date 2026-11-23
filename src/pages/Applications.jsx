import React from 'react';
import { Link } from 'react-router';
import CompanyCard from '../components/CompanyCard';

function Applications({ companies, myProfile, onToggleApply }) {
  const appliedCompanies = companies.filter((company) => company.isApplied === true);

  return (
    <div className="page-box">
      <h2>My Applications</h2>

      {appliedCompanies.length === 0 ? (
        <div>
          <h3>No applications yet</h3>
          <p>You have not applied to any companies so far.</p>
          <Link to="/companies" className="btn-link">
            View Companies
          </Link>
        </div>
      ) : (
        <div className="company-list">
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
