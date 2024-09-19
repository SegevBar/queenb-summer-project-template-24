import React from 'react';
import styles from './RecipePage.module.css';


const RecipePage = (recipe) => {
  return (
    <div className={styles.RecipePage}>
        <h1>{recipe.title}</h1>
    </div>
  );
};

export default RecipePage;
