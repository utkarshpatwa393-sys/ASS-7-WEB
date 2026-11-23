import React from 'react';
import { useParams, Link } from 'react-router';

function CompanyDetails({ companies, myProfile, onToggleApply }) {
  const { id } = useParams();

  // find company by id
  const company = companies.find((c) => String(c.id) === String(id));

  if (!company) {
    return (
      <div className="page-box">
        <h2>Company Not Found</h2>
        <Link to="/companies">Back to Companies</Link>
      </div>
    );
  }

  // check eligibility
  const isEligible =
    myProfile.cgpa >= company.minCGPA &&
    company.eligibleBranches.includes(myProfile.branch);

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
        <p><b>Minimum CGPA:</b> {company.minCGPA}</p>

        {isDream && <p><span className="badge badge-dream">Dream Company</span></p>}

        <p>
          <b>Eligibility Status: </b>
          {isEligible ? (
            <span style={{ color: 'green', fontWeight: 'bold' }}>Eligible</span>
          ) : (
            <span style={{ color: 'red', fontWeight: 'bold' }}>Not Eligible</span>
          )}
        </p>

        <h3>Eligible Branches:</h3>
        <ul>
          {company.eligibleBranches.map((branch, index) => (
            <li key={index}>
              {branch} {branch === myProfile.branch ? '(Your Branch)' : ''}
            </li>
          ))}
        </ul>

        <h3>Description:</h3>
        <p>{company.description}</p>

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
