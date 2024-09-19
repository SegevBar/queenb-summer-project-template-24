import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import AppNav from './components/common/AppNav/AppNav';
import FilterBar from './components/common/FilterBar/FilterBar';



function App() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load available ingredients from backend
    axios.get('http://localhost:5000/api/ingredients')
      .then(response => {
        setIngredients(response.data);
      })
      .catch(error => console.error('Error fetching ingredients:', error));
  }, []);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedIngredients(prevState =>
      prevState.includes(value)
        ? prevState.filter(item => item !== value)
        : [...prevState, value]
    );
  };

  const handleSearchRecipes = () => {
    axios.get('http://localhost:5000/api/recipes', {
      params: { ingredients: selectedIngredients.join(',') },
    })
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => console.error('Error fetching recipes:', error));
  };


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
            <input placeholder='Search Recipe' />
          </span>
        </div>

        <main className={styles.main}>
          <div className={styles.layoutContainer}>
            <FilterBar
              ingredients={ingredients}
              selectedIngredients={selectedIngredients}
              handleCheckboxChange={handleCheckboxChange}
              handleSearchRecipes={handleSearchRecipes}
              recipes={recipes}
            />
            <div className={styles.contentContainer}>
              <Routes>
                <Route path="/" element={<Home />} />
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
