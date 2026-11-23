import React, { useState } from 'react';
import CompanyCard from '../components/CompanyCard';

function Companies({ companies, myProfile, onToggleApply }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredCompanies = companies.filter((company) => {
    // search filter
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.role.toLowerCase().includes(searchTerm.toLowerCase());

    // eligibility check
    const isEligible =
      myProfile.cgpa >= company.minCGPA &&
      company.eligibleBranches.includes(myProfile.branch);

    // dropdown filter
    if (filterType === 'Eligible') {
      return matchesSearch && isEligible;
    }
    if (filterType === 'Not Eligible') {
      return matchesSearch && !isEligible;
    }

    return matchesSearch; // All
  });

  return (
    <div className="page-box">
      <h2>Companies List</h2>

      {/* Search and Dropdown Filter */}
      <div className="filter-controls">
        <label>
          Search:{' '}
          <input
            type="text"
            placeholder="Search company or role..."
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

      {/* List of cards */}
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
