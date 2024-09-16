import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useLogout } from './hooks/useLogout';
import { useAuthContext } from './hooks/useAuthContext'; 

function App() {
  const { logout } = useLogout();
  const { user } = useAuthContext(); // Use `user` instead of `isLoggedIn`

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src="/project-logo.png" alt="Logo" className={styles.appLogo} />
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>Home</Link>
            
            {user ? ( // Check if `user` exists
              <>
                {/* Show the user's email and Logout button when the user is logged in */}
                <span className={styles.userEmail}>{user.email}</span>
                <button onClick={logout} className={styles.appLink}>Logout</button>
              </>
            ) : (
              // Show Login and Signup links when the user is not logged in
              <>
                <Link to="/login" className={styles.appLink}>Login</Link>
                <Link to="/signup" className={styles.appLink}>Signup</Link>
              </>
            )}
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/signup" 
              element={<Signup />} 
            />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2024 My App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
