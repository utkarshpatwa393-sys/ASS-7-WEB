# Campus Placement Drive - Problem Statement P9

**Course:** WEB 301 — Advance Frontend Engineering  
**Assignment:** Assignment 7 (Homework)  
**Problem Statement:** P9 — Campus Placement Drive  

---

## Student Details
- **Student Name:** Utkarsh Patwa
- **Roll Number / UID:** 89
- **Assigned Problem Statement Number:** P9
- **Live Vercel Deployment Link:** [https://utkarshpatwa-midsem-phase2.vercel.app](https://utkarshpatwa-midsem-phase2.vercel.app) *(Replace with your live Vercel URL)*
- **GitHub Repository Link:** [https://github.com/utkarshpatwa/utkarshpatwa-midsem-phase2](https://github.com/utkarshpatwa/utkarshpatwa-midsem-phase2)

---

## Instructions to Install & Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## Project Structure

```
src/
  data/
    companies.js        # Local dataset containing student profile and company list
  components/
    Navbar.jsx          # Reusable navigation bar with live applied count
    CompanyCard.jsx     # Reusable card component for displaying individual companies
  pages/
    Home.jsx            # Home page showing student profile and drive statistics
    Companies.jsx       # Searchable and filterable list of all companies
    CompanyDetails.jsx  # Detailed view of a selected company with eligibility details
    Applications.jsx    # List of all applied companies or empty state
  App.jsx               # Application root managing state, action functions, and routes
  App.css               # Styling
  main.jsx              # Application entry point with BrowserRouter
  index.css             # Base reset CSS
```

---

## Implemented Features & Requirements

1. **Reusable `CompanyCard` Component:** Displays company name, role, package (LPA), location, and drive date.
2. **Student Profile:** Imports `myProfile` from the dataset (Branch: CSE, CGPA: 7.5) and displays it on the Home page.
3. **Special Eligibility Rule:** A company is marked **Eligible** only if `myProfile.cgpa >= minCGPA` and `eligibleBranches.includes(myProfile.branch)`. Otherwise, it displays **Not Eligible**.
4. **Dream Company Badge:** Companies offering a package of 10 LPA or higher (`packageLPA >= 10`) display a `⭐ Dream Company` badge.
5. **Apply ↔ Withdraw Toggle:** Only eligible companies show the Apply / Withdraw toggle button. Non-eligible companies display a "Not Eligible" message instead of the button.
6. **Dropdown Filter:** Filter dropdown on the Companies page with options: `All`, `Eligible`, and `Not Eligible`. Also includes a search input for filtering by company name or role.
7. **Company Details Page (`/companies/:id`):** Shows complete company details including minimum CGPA and eligible branches rendered using `.map()`.
8. **Summary & Applications:**
   - Home page shows live summary counts: Total Companies, Eligible Companies, and Applied Companies.
   - Applications page (`/applications`) displays applied companies, or `"No applications yet"` if none are applied.
9. **Navbar Live Counter:** Displays the real-time number of applied companies in the navigation link.
10. **State Management:** All application state is maintained in `App.jsx` using `useState` and passed down via props.
11. **Routing:** Uses `react-router` (`BrowserRouter`, `Routes`, `Route`, `Link`, `useParams`).
12. **Vercel Deployment Support:** Includes `vercel.json` with rewrite rules to prevent 404 errors on direct route reload.
