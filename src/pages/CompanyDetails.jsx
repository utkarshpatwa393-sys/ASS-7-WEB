import React from 'react';
import { useParams, Link } from 'react-router';

// CompanyDetails page: shows full details of a single company using useParams() and find()
function CompanyDetails({ companies, myProfile, onToggleApply }) {
  const { id } = useParams();

  // Find company using find()
  const company = companies.find((c) => String(c.id) === String(id));

  // If company not found
  if (!company) {
    return (
      <div className="container">
        <h2>Company Not Found</h2>
        <p>No company was found with ID: {id}</p>
        <Link to="/companies" className="btn btn-secondary">
          Back to Companies
        </Link>
      </div>
    );
  }

  // Check eligibility rule
  const isEligible =
    myProfile.cgpa >= company.minCGPA &&
    company.eligibleBranches.includes(myProfile.branch);

  // Check dream company
  const isDream = company.packageLPA >= 10;

  return (
    <div className="container">
      <Link to="/companies" className="back-link">
        ← Back to Companies
      </Link>

      <div className="details-card">
        <div className="details-header">
          <div>
            <h1>{company.name}</h1>
            <p className="details-role">{company.role}</p>
          </div>
          <div className="badges-container">
            {isDream && <span className="badge badge-dream">⭐ Dream Company</span>}
            {isEligible ? (
              <span className="badge badge-eligible">Eligible</span>
            ) : (
              <span className="badge badge-not-eligible">Not Eligible</span>
            )}
          </div>
        </div>

        <hr className="divider" />

        <div className="details-info-grid">
          <div className="info-item">
            <strong>Package:</strong> {company.packageLPA} LPA
          </div>
          <div className="info-item">
            <strong>Location:</strong> {company.location}
          </div>
          <div className="info-item">
            <strong>Drive Date:</strong> {company.driveDate}
          </div>
          <div className="info-item">
            <strong>Minimum CGPA Required:</strong> {company.minCGPA}
          </div>
        </div>

        {/* Eligible branches rendered using map() */}
        <div className="branches-box">
          <h3>Eligible Branches:</h3>
          <div className="branches-list">
            {company.eligibleBranches.map((branch, index) => (
              <span
                key={index}
                className={`branch-pill ${branch === myProfile.branch ? 'branch-pill-match' : ''}`}
              >
                {branch} {branch === myProfile.branch ? '(Your Branch)' : ''}
              </span>
            ))}
          </div>
        </div>

        <div className="description-box">
          <h3>Job Description:</h3>
          <p>{company.description}</p>
        </div>

        {/* Eligibility Verification Box */}
        <div className="eligibility-status-box">
          <h3>Your Eligibility Status:</h3>
          <p>
            • Your CGPA: <strong>{myProfile.cgpa}</strong> (Required: {company.minCGPA})
          </p>
          <p>
            • Your Branch: <strong>{myProfile.branch}</strong>
          </p>
          <p>
            • Result:{' '}
            {isEligible ? (
              <span className="status-yes">You are Eligible for this drive!</span>
            ) : (
              <span className="status-no">You are Not Eligible for this drive.</span>
            )}
          </p>
        </div>

        {/* Action button: Apply/Withdraw for eligible, or text for not eligible */}
        <div className="details-actions">
          {isEligible ? (
            <button
              className={`btn btn-large ${company.isApplied ? 'btn-withdraw' : 'btn-apply'}`}
              onClick={() => onToggleApply(company.id)}
            >
              {company.isApplied ? 'Withdraw Application' : 'Apply Now'}
            </button>
          ) : (
            <span className="text-not-eligible large">Not Eligible</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
