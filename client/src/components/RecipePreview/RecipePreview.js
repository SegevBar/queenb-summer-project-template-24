import React from 'react';
import styles from './RecipePreview.module.css';


// const recipe = {
//     name: 'Recipe 1',
//     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Bhjrw_2cehaODLRBDHzHlLBL2CdOtrpdPA&s',
//     img: styles.img,
//     prepTime: '10 minutes'
//  };

function getIngredients(recipe) {
    return recipe.ingredients.map(ingredient => ingredient.ingredient).join(', ')
}

const RecipePreview = ({ recipe }) => {
    return (
        <div className={styles.recipe}>
            <img src={recipe.imageUrl} alt={recipe.title} className={styles.img} />
            <h2>{recipe.title}</h2>
            <p><b>🕑 Prep time: </b>{recipe.totalTime} minutes</p>
            <p><b>Ingredients: </b>{getIngredients(recipe)}</p>
        </div>
    )
};

export default RecipePreview;