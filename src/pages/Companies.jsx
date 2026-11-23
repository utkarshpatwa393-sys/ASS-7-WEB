import React, { useState } from 'react';
import CompanyCard from '../components/CompanyCard';

// Companies page: displays searchable and filterable company list
function Companies({ companies, myProfile, onToggleApply }) {
  // Controlled input states for search and filter dropdown
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Filter companies using filter()
  const filteredCompanies = companies.filter((company) => {
    // Check search term against company name and role
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.role.toLowerCase().includes(searchTerm.toLowerCase());

    // Check eligibility rule
    const isEligible =
      myProfile.cgpa >= company.minCGPA &&
      company.eligibleBranches.includes(myProfile.branch);

    // Apply dropdown filter: All, Eligible, Not Eligible
    if (filterType === 'Eligible') {
      return matchesSearch && isEligible;
    } else if (filterType === 'Not Eligible') {
      return matchesSearch && !isEligible;
    }

    return matchesSearch; // All
  });

  return (
    <div className="container">
      <div className="page-header">
        <h2>All Visiting Companies</h2>
        <p className="subtitle">
          Browse companies visiting the campus, filter by your eligibility, and apply directly.
        </p>
      </div>

      {/* Search and Dropdown Filter Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="search">Search: </label>
          <input
            id="search"
            type="text"
            className="input-text"
            placeholder="Search by company or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="filter">Filter: </label>
          <select
            id="filter"
            className="select-dropdown"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Eligible">Eligible</option>
            <option value="Not Eligible">Not Eligible</option>
          </select>
        </div>
      </div>

      {/* Companies List */}
      <div className="cards-grid">
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
          <p className="no-data-msg">No companies found matching your search or filter.</p>
        )}
      </div>
    </div>
  );
}

export default Companies;
