import React, { useState } from 'react';
import { Routes, Route } from 'react-router';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Companies from './pages/Companies';
import CompanyDetails from './pages/CompanyDetails';
import Applications from './pages/Applications';

// Data
import { companiesData, myProfile } from './data/companies';

// CSS
import './App.css';

function App() {
  // 1. Main state: stores the list of all companies
  const [companies, setCompanies] = useState(companiesData);

  // 2. Action function: toggle Apply and Withdraw
  function handleToggleApply(companyId) {
    // Map through companies to find the clicked one
    const updatedCompanies = companies.map((company) => {
      if (company.id === companyId) {
        // Toggle isApplied: true becomes false, false becomes true
        return {
          ...company,
          isApplied: !company.isApplied
        };
      } else {
        return company;
      }
    });

    // Update state with new list
    setCompanies(updatedCompanies);
  }

  // 3. Count how many companies are currently applied
  const appliedCount = companies.filter((company) => company.isApplied === true).length;

  return (
    <div>
      {/* Navbar with live applied count */}
      <Navbar appliedCount={appliedCount} />

      {/* Page Routing */}
      <div className="main-content">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={<Home companies={companies} myProfile={myProfile} />}
          />

          {/* Companies List Route */}
          <Route
            path="/companies"
            element={
              <Companies
                companies={companies}
                myProfile={myProfile}
                onToggleApply={handleToggleApply}
              />
            }
          />

          {/* Single Company Details Route */}
          <Route
            path="/companies/:id"
            element={
              <CompanyDetails
                companies={companies}
                myProfile={myProfile}
                onToggleApply={handleToggleApply}
              />
            }
          />

          {/* Applied Companies Route */}
          <Route
            path="/applications"
            element={
              <Applications
                companies={companies}
                myProfile={myProfile}
                onToggleApply={handleToggleApply}
              />
            }
          />
        </Routes>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>Campus Placement Drive Portal | WEB 301 Assignment</p>
      </div>
    </div>
  );
}

export default App;
