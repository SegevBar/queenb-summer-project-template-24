// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom'; // Import required components and hooks
import Home from './pages/HomePage/HomePage'; // Ensure the path is correct
import styles from './styles/App.module.css'; // Correctly import CSS module
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useLogout } from './hooks/useLogout';
import { useAuthContext } from './hooks/useAuthContext'; 
import AppNav from './components/common/AppNav/AppNav';
import FilterBar from './components/common/FilterBar/FilterBar';

function App() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <AppContent logout={logout} user={user} />
    </BrowserRouter>
  );
}

function AppContent({ logout, user }) {
  const location = useLocation();
  const navigate = useNavigate(); // Add useNavigate hook here

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // Redirect to home if the user is already logged in and tries to access login or signup pages
  if (user && isAuthPage) {
    return <Navigate to="/" replace />;
  }

  // Redirect to login if not authenticated and trying to access a protected route
  if (!user && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  // Modify the logout handler to redirect to login
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className={styles.app}>
      {/* Header with Navbar */}
      <header className={styles.appHeader}>
        <div className={styles.headerContent}>
          <img src="/project-logo.png" alt="Logo" className={styles.appLogo} />
          <nav className={styles.appNav}>
            {user ? (
              <>
                {/* Render the "Home" link and categories when the user is signed in */}
                <Link to="/" className={styles.appLink}>Home</Link>
                <AppNav />
                <span className={styles.userEmail}>{user.email}</span>
                <button onClick={handleLogout} className={styles.appLink}>Logout</button>
              </>
            ) : (
              <>
                {/* Render only login and signup links when the user is not signed in */}
                <Link to="/login" className={styles.appLink}>Login</Link>
                <Link to="/signup" className={styles.appLink}>Signup</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Only render the search and filter when not on auth pages */}
      {!isAuthPage && (
        <div className={styles.searchAndFilter}>
          <span>
            <input placeholder="Search Recipe" />
          </span>
        </div>
      )}

      <main className={isAuthPage ? styles.authMain : styles.main}>
        {isAuthPage ? (
          // Render login/signup forms centered on the page
          <div className={styles.authContainer}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        ) : (
          // Render the regular layout
          <div className={styles.layoutContainer}>
            <FilterBar />
            <div className={styles.contentContainer}>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
              <footer className={styles.footer}>
                <p>&copy; 2024 My App</p>
              </footer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App; // Make sure to export the App component as default
