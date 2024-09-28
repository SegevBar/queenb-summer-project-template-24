import React, { useState } from 'react'; // React for JSX and component creation
import styles from './Home.module.css'; // CSS Module for styling
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'; // Hook for authentication context
import Recipelist from '../../components/Recipelist'; // List of recipes component
import useFetch from '../../useFetch'; // Custom hook for fetching data

// URL to fetch recipes from the API
const url = process.env.REACT_APP_API_URL + '/recipes';

const HomePage = () => {
  const { user } = useAuthContext(); // Getting the user context

  // Fetching recipes data from the API
  const { error, isLoading, data: recipes } = useFetch(url);

  return (
    <div className={styles.home}>
    <h1 className={styles.headline}> The Royal CookBook</h1>

      {/* Display error if any */}
      {error && <div>{error}</div>}
      {/* Display loading message while data is being fetched */}
      {isLoading && <div>Loading...</div>}
      {/* Display list of recipes once data is fetched */}
      {recipes && <Recipelist recipes={recipes} />}

      {/* If a user is logged in, show the 'Add Recipe' button */}
      {user && (
        <Link to="/RecipeForm" className={styles.addRecipeButton}>
          Add Recipe
        </Link>
      )}
    </div>
  );
};

export default HomePage;
