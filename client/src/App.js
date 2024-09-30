import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';

import signup from './pages/signup';
import login from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>         
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<signup />} />
            <Route path="/login" element={<login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
