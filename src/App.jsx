import React, { useState } from 'react';
import { Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Companies from './pages/Companies';
import CompanyDetails from './pages/CompanyDetails';
import Applications from './pages/Applications';
import { companiesData, myProfile } from './data/companies';
import './App.css';

function App() {
  // Main application state maintained in App.jsx using useState
  const [companies, setCompanies] = useState(companiesData);

  // Action function to toggle Apply <-> Withdraw
  const handleToggleApply = (companyId) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) => {
        if (company.id === companyId) {
          // Special rule: only eligible companies can be applied to
          const isEligible =
            myProfile.cgpa >= company.minCGPA &&
            company.eligibleBranches.includes(myProfile.branch);

          if (isEligible) {
            return {
              ...company,
              isApplied: !company.isApplied,
            };
          }
        }
        return company;
      })
    );
  };

  // Calculate live count of applied companies for Navbar
  const appliedCount = companies.filter((c) => c.isApplied).length;

  return (
    <div className="app">
      {/* Navigation Bar with live count */}
      <Navbar appliedCount={appliedCount} />

      {/* Main Content Area with Routes */}
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Home companies={companies} myProfile={myProfile} />}
          />
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
      </main>

      {/* Basic Footer */}
      <footer className="footer">
        <p>Campus Placement Drive Portal • WEB 301 Assignment 7 (P9)</p>
      </footer>
    </div>
  );
}

export default App;
