import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'; // Adjust the import path here
import styles from '../../styles/App.module.css';

const HomePage = () => {
  const { user } = useAuthContext();

  // Check if user is being detected
  console.log("User status:", user);

  return (
    <div>
      {!user && (
        <div>
          <h3>Sign up or log in in order to upload content</h3>
        </div>
      )}

      {user && (
        <Link to="/RecipeForm" className={styles.addRecipeButton}>
          Add Recipe
        </Link>
      )}
    </div>
  );
};

export default HomePage;
