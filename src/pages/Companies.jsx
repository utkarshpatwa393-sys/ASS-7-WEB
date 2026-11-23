import React, { useState } from 'react';
import CompanyCard from '../components/CompanyCard';

function Companies({ companies, myProfile, onToggleApply }) {
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  // State for dropdown filter: 'All', 'Eligible', 'Not Eligible'
  const [filterType, setFilterType] = useState('All');

  // Filter companies based on search input and dropdown
  const filteredCompanies = companies.filter((company) => {
    // 1. Search filter: check company name or role
    const nameMatch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = company.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || roleMatch;

    // 2. Eligibility filter
    const cgpaOk = myProfile.cgpa >= company.minCGPA;
    const branchOk = company.eligibleBranches.includes(myProfile.branch);
    const isEligible = cgpaOk && branchOk;

    // 3. Dropdown filter logic
    if (filterType === 'Eligible') {
      return matchesSearch && isEligible;
    }
    if (filterType === 'Not Eligible') {
      return matchesSearch && !isEligible;
    }

    // If filterType is 'All'
    return matchesSearch;
  });

  return (
    <div className="page-box">
      <h2>All Companies</h2>

      {/* Search and Filter Controls */}
      <div className="filter-controls">
        <label>
          Search:{' '}
          <input
            type="text"
            placeholder="Type company or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        <label style={{ marginLeft: '15px' }}>
          Filter:{' '}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Eligible">Eligible</option>
            <option value="Not Eligible">Not Eligible</option>
          </select>
        </label>
      </div>

      {/* List of Companies */}
      <div className="company-list">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              myProfile={myProfile}
              onToggleApply={onToggleApply}
            />
          ))
        ) : (
          <p>No companies found.</p>
        )}
      </div>
    </div>
  );
}

export default Companies;
