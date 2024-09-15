import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import Search from './components/common/SearchBar/SearchBar';
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

        <div className={styles.searchBar}>
          <AppNav />
          {/* <span>
            <input placeholder='Search Recipe'></input>
          </span> */}
          <div>
            <Search />
          </div>
        </div>
        
        

        <main className={styles.main}>
          <div className={styles.layoutContainer}>
            <FilterBar />
            {/* <div className={styles.searchContainer}>
              <Search />
            </div> */}
            <div className={styles.contentContainer}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
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
