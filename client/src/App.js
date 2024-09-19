import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage'
import styles from './styles/App.module.css'
import Login from './pages/login'
import { useLogout } from './hooks/useLogout'
import { useAuthContext } from './hooks/useAuthContext';
import Signup from './pages/signup'



function App() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src="/project-logo.png" alt="Logo" className={styles.appLogo} />
          <nav className={styles.appNav}>
            {!user && (
              <div>
                <Link to="/login" className={styles.appLink}>Log in</Link>
                <Link to="/signup" className={styles.appLink}>Sign up</Link>
              </div>
            )}
            {user && (
              <div>
                <span>{user.email}</span>
                <button onclick={handleClick}>Log out</button>
              </div>
            )}
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
