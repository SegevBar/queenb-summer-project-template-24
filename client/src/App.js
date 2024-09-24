import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/HomePage/HomePage'; 
import RecipeForm from './pages/UploadRecipe/RecipeForm'; 
import styles from './styles/App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <nav className={styles.appNav}>
            <div className={styles.leftNav}>
              <Link to="/" className={styles.appLink}>
                <button className={styles.homeButton}>Home</button>
              </Link>
            </div>
            
            {/* Upload Recipe and Login buttons on the right */}
            <div className={styles.rightNav}>
              <Link to="/upload-recipe" className={styles.appLink}>
                <button className={styles.uploadButton}>Upload Recipe</button>
              </Link>
              <button className={styles.loginButton}>Login</button>
            </div>
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload-recipe" element={<RecipeForm />} /> 
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
