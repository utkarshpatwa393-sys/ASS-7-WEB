import React from 'react';
import { Link } from 'react-router';

function CompanyCard({ company, myProfile, onToggleApply }) {
  const hasGoodCgpa = myProfile.cgpa >= company.minCGPA;
  const hasValidBranch = company.eligibleBranches.includes(myProfile.branch);
  const isEligible = hasGoodCgpa && hasValidBranch;
  const isDream = company.packageLPA >= 10;

  return (
    <div className="company-card">
      <div className="card-header">
        <h3>{company.name}</h3>

        <div>
          {isDream && <span className="badge badge-dream">Dream Company</span>}
          {isEligible ? (
            <span className="badge badge-eligible">Eligible</span>
          ) : (
            <span className="badge badge-not-eligible">Not Eligible</span>
          )}
        </div>
      </div>

      <p><b>Role:</b> {company.role}</p>
      <p><b>Package:</b> {company.packageLPA} LPA</p>
      <p><b>Location:</b> {company.location}</p>
      <p><b>Drive Date:</b> {company.driveDate}</p>

      <div className="card-buttons">
        <Link to={`/companies/${company.id}`} className="details-link">
          View Details
        </Link>

        {isEligible ? (
          <button
            className={company.isApplied ? 'withdraw-btn' : 'apply-btn'}
            onClick={() => onToggleApply(company.id)}
          >
            {company.isApplied ? 'Withdraw' : 'Apply'}
          </button>
        ) : (
          <span className="not-eligible-text">Not Eligible</span>
        )}
      </div>
    </div>
  );
}

export default CompanyCard;
