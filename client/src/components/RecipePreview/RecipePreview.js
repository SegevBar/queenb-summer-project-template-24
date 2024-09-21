import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecipePreview.module.css';


function getIngredients(recipe) {
    return recipe.ingredients.map(ingredient => ingredient.ingredient).join(', ')
}

const RecipePreview = ({ recipe }) => {
    const navigate = useNavigate();

    const goToRecipe = () => {
        navigate(`/recipes/${encodeURIComponent(recipe.title)}`);
    };
    
    return (
        <div className={styles.recipe} onClick={goToRecipe}>
            <img src={recipe.imageUrl} alt={recipe.title} className={styles.img} />
            <h2>{recipe.title}</h2>
            <p><b>🕑 Prep time: </b>{recipe.totalTime} minutes</p>
            <p><b>Ingredients: </b>{getIngredients(recipe)}</p>
        </div>
    )
};

export default RecipePreview;