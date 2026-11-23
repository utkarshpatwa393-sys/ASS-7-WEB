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
  // state for all companies
  const [companies, setCompanies] = useState(companiesData);

  // function to apply or withdraw from a company
  function handleToggleApply(id) {
    const updated = companies.map((comp) => {
      if (comp.id === id) {
        // toggle isApplied only for this company
        return {
          ...comp,
          isApplied: !comp.isApplied
        };
      }
      return comp;
    });
    setCompanies(updated);
  }

  // count of applied companies
  const appliedCount = companies.filter((c) => c.isApplied).length;

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
        <p>Campus Placement Drive Portal | WEB 301</p>
      </div>
    </div>
  );
}

export default App;
