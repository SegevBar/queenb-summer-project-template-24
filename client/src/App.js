import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import UploadAnimal from './pages//UploadAnimalPage/UploadAnimal';
import styles from './styles/App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src="/logo2.png" alt="Logo" className={styles.appLogo} />
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>
              <button class="log">Login</button>
              <button class="reg">Sign up</button>
            </Link>
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/UploadAnimal" element={<UploadAnimal />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; Happily adopted</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
