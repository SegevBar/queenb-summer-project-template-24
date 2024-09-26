import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import RecipePage from './pages/RecipePage/RecipePage';
import styles from './styles/App.module.css';
import AppNav from './components/common/AppNav/AppNav';
import FilterBar from './components/common/FilterBar/FilterBar';



function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          {/* <img src="/project-logo.png" alt="Logo" className={styles.appLogo} /> */}
          <h1 className={styles.headline}>Best Recipes Website</h1>
          <nav className={styles.user}>
            <button className={styles.addButton}>Add Recipe</button>
            <Link to="/saved" className={styles.appLink}>Saved🤍</Link>
            <Link to="/" className={styles.appLink}>Logout</Link>
          </nav>
        </header>

        <div className={styles.searchAndFilter}>
          <AppNav />
          <span>
            <input placeholder='Search Recipe'></input>
          </span>
        </div>
        
        

        <main className={styles.main}>
          <div className={styles.layoutContainer}>
            <FilterBar />
            <div className={styles.contentContainer}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes/:recipeName" element={<RecipePage />} />
                <Route path="/recipes/category/:title" element={<CategoryPage />} />
              </Routes>
              <footer className={styles.footer}>
                <p>&copy; 2024 My App</p>
              </footer>
            </div>
            


          </div>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
