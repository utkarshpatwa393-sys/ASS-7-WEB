import React, { useState } from 'react';
import CompanyCard from '../components/CompanyCard';

function Companies({ companies, myProfile, onToggleApply }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredCompanies = companies.filter((company) => {
    const nameMatch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = company.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || roleMatch;

    const cgpaOk = myProfile.cgpa >= company.minCGPA;
    const branchOk = company.eligibleBranches.includes(myProfile.branch);
    const isEligible = cgpaOk && branchOk;

    if (filterType === 'Eligible') {
      return matchesSearch && isEligible;
    }
    if (filterType === 'Not Eligible') {
      return matchesSearch && !isEligible;
    }

    return matchesSearch;
  });

  return (
    <div className="page-box">
      <h2>All Companies</h2>

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
