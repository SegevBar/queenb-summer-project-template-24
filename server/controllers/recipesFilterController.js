const Recipe = require('../models/RecipeModel');
const Ingredient = require('../models/IngredientModel');

// Get all recipes by certain ingredient
const getRecepiesByIngredients = async (req, res) => {
  //todo - check what happens in "all" category
//todo - check that it is inserted with capital letterin the search query
  try {
    const { ingredients, category } = req.query;

    // Make sure the ingredients are handled as an array (even if there's only one ingredient)
    const ingredientsList = Array.isArray(ingredients) ? ingredients : [ingredients];

    // Find the ingredients in the Ingredient collection
    const foundIngredients = await Ingredient.find({ ingredient: { $in: ingredientsList } }).populate('recipes');

    if (foundIngredients.length === 0) {
      return res.status(404).json({ message: 'No recipes found for the given ingredients' });
    }

    // Collect recipe IDs from the found ingredients
    let recipeIds = [];
    foundIngredients.forEach(ingredient => {
      recipeIds = recipeIds.concat(ingredient.recipes);
    });

    recipeIds = [...new Set(recipeIds)];  // Remove duplicates

    // Find the recipes that match the ingredient IDs and contain all the specified ingredients
    const filteredRecipes = await Recipe.find({
      _id: { $in: recipeIds },
      'ingredients.ingredient': { $all: ingredientsList }  // Ensure recipes contain all ingredients
    });

    if (filteredRecipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found with all specified ingredients' });
    }

    // Filter by category if provided
    let finalRecipes = filteredRecipes;
    if (category) {
      finalRecipes = filteredRecipes.filter(recipe => recipe.categories.includes(category));
    }

    return res.status(200).json({ recipes: finalRecipes });
  } catch (err) {
    console.error('Error fetching recipes:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getRecepiesByIngredients
};



// const Recipe = require('../models/RecipeModel');
// const Ingredient = require('../models/IngredientModel');


// // Get all recipes by certain ingredient
// const getRecepiesByIngredients = async (req, res) => {

//     try {
//         const { ingredients, category } = req.query;  // Ingredients as an array, category as a string
//         // const ingredientsList = Array.isArray(ingredients) ? ingredients : [ingredients]; //todo - check how the ingresitned is provided in req
//         const ingredientsList = ingredients ? ingredients.split(',') : []; // Split ingredients into an array
//         const foundIngredients = await Ingredient.find({ ingredient: { $in: ingredientsList } }).populate('recipes');
        
//         if (foundIngredients.length === 0) {
//           return res.status(404).json({ message: 'No recipes found for the given ingredients' });
//         }
    
//         let recipeIds = [];
//         foundIngredients.forEach(ingredient => {
//           recipeIds = recipeIds.concat(ingredient.recipes);
//         });
    
//         recipeIds = [...new Set(recipeIds)];
    
//         const filteredRecipes = await Recipe.find({
//           _id: { $in: recipeIds }, 
//           'ingredients.ingredient': { $all: ingredientsList }  // Ensure recipes contain all ingredients
//         });
    
//         if (filteredRecipes.length === 0) {
//           return res.status(404).json({ message: 'No recipes found with all specified ingredients' });
//         }
    
//         let finalRecipes = filteredRecipes;
//         if (category) {
//           finalRecipes = filteredRecipes.filter(recipe => recipe.categories.includes(category));
//         }
    
//         return res.status(200).json({ recipes: finalRecipes });
    
//       } catch (err) {
//         console.error('Error fetching recipes:', err);
//         return res.status(500).json({ message: 'Server error' });
//       }
//     };

//     module.exports = {
//       getRecepiesByIngredients
//     }
   
      


      


// // const getRecepiesByIngredients = async (req, res) => {
// //     const { category, search, ingredients } = req.query; // Extract category, search, and ingredients from query params
// //     const ingredientList = ingredients ? ingredients.split(',') : []; // Split ingredients into an array

// //     try {
// //         // Build the query
// //         const query = {};
//         if (category && category !== 'all') {
//             query.categories = category;
//         }
//         if (search) {
//             query.name = { $regex: search, $options: 'i' }; // Assuming your recipes have a 'name' field
//         }
//         if (ingredientList.length > 0) {
//             query.ingredients = { $all: ingredientList };
//         }

//         const recipes = await Recipe.find(query, { _id: 1 }); // Adjust projection if necessary
//         res.json(recipes);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to filter recipes' });
//     }
// };

// module.exports = {
//     getRecepiesByIngredients
// };


// // const Recipe = require('./models/RecipeModel');
// // const Recipe = require('./models/IngredientModel');



// // const fetchRecipes = async (category) => {
// //     const response = await fetch(`/api/recipes?category=${category}`);
// //     const data = await response.json();
// //     return data;
// // };

// // // get recipe by requested Ingredients

// // const getRecepiesByIngredients = async (req, res) => {
// //     const { category } = req.query;  // Extract category from query params
// //     const ingredientList = ingredients.split(','); //todo - check how i receive thse ingredients

// //     try {
// //         // If category is 'all', return all recipes, otherwise filter by category
// //         const query = category === 'all' ? {} : { categories: category };

// //         const recipes = await Recipe.find({
// //           ...query, ingredients: { $all: ingredientList }
// //         }, {
// //           _id: 1 //should it return id's or the recipe objects?
// //         });
// //         res.json(recipes);
        
// //     } catch (error) {
// //         res.status(500).json({ error: 'Failed to filter recipes' });
// //     }

// // };


// // module.exports = {
// //     getRecepiesByIngredients
// // }



