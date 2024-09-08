import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import AppNav from './components/common/AppNav/AppNav';



function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          {/* <img src="/project-logo.png" alt="Logo" className={styles.appLogo} /> */}
          <h1 className={styles.headline}>Best Recipes Website</h1>
          <nav className={styles.user}>
            <Link to="/saved" className={styles.appLink}>Saved🤍</Link>
            <Link to="/" className={styles.appLink}>Login</Link>
          </nav>

        </header>
        <AppNav />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
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
