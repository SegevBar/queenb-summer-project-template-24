import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import Login from './pages/login';
import { useLogout } from './hooks/useLogout';
import { useAuthContext } from './hooks/useAuthContext';
import Signup from './pages/signup';
import RecipeForm from './pages/UploadRecipe/RecipeForm';

function App() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <nav className={styles.appNav}>
            {!user && (
              <div>
                <Link to="/login" className={styles.appLink}>Log in</Link>
                <Link to="/signup" className={styles.appLink}>Sign up</Link>
              </div>
            )}
            {user && (
              <div className={styles.userSection}>
                <span>{user.email}</span>
                <button onClick={handleClick} className={styles.logoutButton}>Log out</button>
              </div>
            )}
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/RecipeForm" element={user ? <RecipeForm /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2024 My App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App; // Ensure this line exists
