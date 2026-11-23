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
  const [companies, setCompanies] = useState(companiesData);

  function handleToggleApply(companyId) {
    const updatedCompanies = companies.map((company) => {
      if (company.id === companyId) {
        return {
          ...company,
          isApplied: !company.isApplied
        };
      } else {
        return company;
      }
    });

    setCompanies(updatedCompanies);
  }

  const appliedCount = companies.filter((company) => company.isApplied === true).length;

  return (
    <div>
      <Navbar appliedCount={appliedCount} />

      <div className="main-content">
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
      </div>

      <div className="footer">
        <p>Campus Placement Drive Portal | WEB 301 Assignment</p>
      </div>
    </div>
  );
}

export default App;
