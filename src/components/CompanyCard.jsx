import React from 'react';
import { Link } from 'react-router';

// Reusable CompanyCard component
function CompanyCard({ company, myProfile, onToggleApply }) {
  // Check eligibility rule: cgpa >= minCGPA and eligibleBranches includes myProfile.branch
  const isEligible =
    myProfile.cgpa >= company.minCGPA &&
    company.eligibleBranches.includes(myProfile.branch);

  // Check dream company: packageLPA >= 10
  const isDream = company.packageLPA >= 10;

  return (
    <div className="company-card">
      <div className="card-top">
        <h3 className="company-name">{company.name}</h3>
        <div className="badges-container">
          {isDream && <span className="badge badge-dream">⭐ Dream Company</span>}
          {isEligible ? (
            <span className="badge badge-eligible">Eligible</span>
          ) : (
            <span className="badge badge-not-eligible">Not Eligible</span>
          )}
        </div>
      </div>

      <div className="card-details">
        <p><strong>Role:</strong> {company.role}</p>
        <p><strong>Package:</strong> {company.packageLPA} LPA</p>
        <p><strong>Location:</strong> {company.location}</p>
        <p><strong>Drive Date:</strong> {company.driveDate}</p>
      </div>

      <div className="card-actions">
        <Link to={`/companies/${company.id}`} className="btn btn-details">
          View Details
        </Link>

        {isEligible ? (
          <button
            className={`btn ${company.isApplied ? 'btn-withdraw' : 'btn-apply'}`}
            onClick={() => onToggleApply(company.id)}
          >
            {company.isApplied ? 'Withdraw' : 'Apply'}
          </button>
        ) : (
          <span className="text-not-eligible">Not Eligible</span>
        )}
      </div>
    </div>
  );
}

export default CompanyCard;
