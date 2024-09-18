const Recipe = require('./models/RecipeModel');
const Recipe = require('./models/IngredientModel');


const getRecepiesByIngredients = async (req, res) => {
    const { category, search, ingredients } = req.query; // Extract category, search, and ingredients from query params
    const ingredientList = ingredients ? ingredients.split(',') : []; // Split ingredients into an array

    try {
        // Build the query
        const query = {};
        if (category && category !== 'all') {
            query.categories = category;
        }
        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Assuming your recipes have a 'name' field
        }
        if (ingredientList.length > 0) {
            query.ingredients = { $all: ingredientList };
        }

        const recipes = await Recipe.find(query, { _id: 1 }); // Adjust projection if necessary
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to filter recipes' });
    }
};

module.exports = {
    getRecepiesByIngredients
};


// const Recipe = require('./models/RecipeModel');
// const Recipe = require('./models/IngredientModel');



// const fetchRecipes = async (category) => {
//     const response = await fetch(`/api/recipes?category=${category}`);
//     const data = await response.json();
//     return data;
// };

// // get recipe by requested Ingredients

// const getRecepiesByIngredients = async (req, res) => {
//     const { category } = req.query;  // Extract category from query params
//     const ingredientList = ingredients.split(','); //todo - check how i receive thse ingredients

//     try {
//         // If category is 'all', return all recipes, otherwise filter by category
//         const query = category === 'all' ? {} : { categories: category };

//         const recipes = await Recipe.find({
//           ...query, ingredients: { $all: ingredientList }
//         }, {
//           _id: 1 //should it return id's or the recipe objects?
//         });
//         res.json(recipes);
        
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to filter recipes' });
//     }

// };


// module.exports = {
//     getRecepiesByIngredients
// }

