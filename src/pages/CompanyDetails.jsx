import React from 'react';
import { useParams, Link } from 'react-router';

function CompanyDetails({ companies, myProfile, onToggleApply }) {
  // Get the company id from URL: /companies/:id
  const { id } = useParams();

  // Find the company in the list by matching id
  const company = companies.find((comp) => comp.id === Number(id));

  // If company is not found
  if (!company) {
    return (
      <div className="page-box">
        <h2>Company Not Found</h2>
        <Link to="/companies">Back to Companies</Link>
      </div>
    );
  }

  // Check eligibility conditions
  const hasGoodCgpa = myProfile.cgpa >= company.minCGPA;
  const hasValidBranch = company.eligibleBranches.includes(myProfile.branch);
  const isEligible = hasGoodCgpa && hasValidBranch;

  // Check dream company
  const isDream = company.packageLPA >= 10;

  return (
    <div className="page-box">
      <Link to="/companies" className="back-link">← Back to Companies</Link>

      <div className="details-container">
        <h2>{company.name}</h2>
        <p><b>Role:</b> {company.role}</p>
        <p><b>Package:</b> {company.packageLPA} LPA</p>
        <p><b>Location:</b> {company.location}</p>
        <p><b>Drive Date:</b> {company.driveDate}</p>
        <p><b>Minimum CGPA Required:</b> {company.minCGPA}</p>

        {/* Dream Company Badge */}
        {isDream && <p><span className="badge badge-dream">Dream Company</span></p>}

        {/* Eligibility Status */}
        <p>
          <b>Eligibility Status: </b>
          {isEligible ? (
            <span style={{ color: 'green', fontWeight: 'bold' }}>Eligible</span>
          ) : (
            <span style={{ color: 'red', fontWeight: 'bold' }}>Not Eligible</span>
          )}
        </p>

        {/* Eligible Branches mapped with map() */}
        <h3>Eligible Branches:</h3>
        <ul>
          {company.eligibleBranches.map((branch, index) => {
            return (
              <li key={index}>
                {branch}
                {branch === myProfile.branch ? ' (Your Branch)' : ''}
              </li>
            );
          })}
        </ul>

        {/* Job Description */}
        <h3>Description:</h3>
        <p>{company.description}</p>

        {/* Action Button: Apply/Withdraw for eligible, or text for not eligible */}
        <div style={{ marginTop: '20px' }}>
          {isEligible ? (
            <button
              className={company.isApplied ? 'withdraw-btn' : 'apply-btn'}
              onClick={() => onToggleApply(company.id)}
            >
              {company.isApplied ? 'Withdraw Application' : 'Apply Now'}
            </button>
          ) : (
            <span className="not-eligible-text">Not Eligible</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
