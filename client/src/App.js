import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import FirstButton from "./components/common/FirstButton/FirstButton";
import UploadForm from "./components/uploadForm.js";
import ItemsGrid from "./components/ItemsGrid/ItemsGrid.js";


function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <Link to="/">
            <img src="/project-logo.png" alt="Logo" className={styles.appLogo} />
          </Link>
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>Home</Link>
            <Link to='/upload' className={styles.appLink}>Upload</Link>
            <Link to="/WomensCollection" className={styles.appLink}>Womens</Link>
            <Link to="/MensCollection" className={styles.appLink}>Mens</Link>
            <FirstButton className={styles.navButton}>Login/Sign Up</FirstButton>
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/WomensCollection" element={<ItemsGrid />} />
            <Route path="/MensCollection" element={<ItemsGrid />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; QueenB Summer Camp Project 2024</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
