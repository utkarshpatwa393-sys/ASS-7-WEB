import React from 'react';
import { Link } from 'react-router';

// Reusable card for a single company
function CompanyCard({ company, myProfile, onToggleApply }) {
  // Step 1: Check CGPA condition
  const hasGoodCgpa = myProfile.cgpa >= company.minCGPA;

  // Step 2: Check Branch condition
  const hasValidBranch = company.eligibleBranches.includes(myProfile.branch);

  // Step 3: Company is Eligible ONLY if both CGPA and Branch match
  const isEligible = hasGoodCgpa && hasValidBranch;

  // Step 4: Dream company badge if package is 10 LPA or higher
  const isDream = company.packageLPA >= 10;

  return (
    <div className="company-card">
      <div className="card-header">
        <h3>{company.name}</h3>

        {/* Badges */}
        <div>
          {isDream && <span className="badge badge-dream">Dream Company</span>}
          {isEligible ? (
            <span className="badge badge-eligible">Eligible</span>
          ) : (
            <span className="badge badge-not-eligible">Not Eligible</span>
          )}
        </div>
      </div>

      {/* Company Info */}
      <p><b>Role:</b> {company.role}</p>
      <p><b>Package:</b> {company.packageLPA} LPA</p>
      <p><b>Location:</b> {company.location}</p>
      <p><b>Drive Date:</b> {company.driveDate}</p>

      {/* Actions */}
      <div className="card-buttons">
        <Link to={`/companies/${company.id}`} className="details-link">
          View Details
        </Link>

        {/* If eligible: show Apply/Withdraw button. If not eligible: show text */}
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
