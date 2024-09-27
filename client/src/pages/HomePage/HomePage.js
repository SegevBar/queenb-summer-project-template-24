import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'; // Hook for authentication context
import React from 'react'; // React for JSX and component creation
import Recipelist from '../../components/Recipelist'; // List of recipes component
import styles from './Home.module.css'; // CSS Module for styling
import useFetch from '../../useFetch'; // Custom hook for fetching data

// URL to fetch recipes from the API
const url = process.env.REACT_APP_API_URL + '/recipes';

const HomePage = () => {
  const { user } = useAuthContext(); // Getting the user context

  // Fetching recipes data from the API
  const { error, isLoading, data: recipes } = useFetch(url);

  return (
    <div className={styles.home}>
      {/* Display error if any */}
      {error && <div>{error}</div>}

      {/* Display loading message while data is being fetched */}
      {isLoading && <div>Loading...</div>}

      {/* Display list of recipes once data is fetched */}
      {recipes && <Recipelist recipes={recipes} title="All Recipes" />}

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
