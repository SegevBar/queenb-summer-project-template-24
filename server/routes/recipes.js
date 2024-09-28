
const express = require('express'); // Importing the express framework
// const Recipe = require('../models/Recipe'); // Importing the Recipe model for database interactions

const router = express.Router(); // Creating an instance of the Express Router


const { getAllRecipes,
        getRecipeByID,
 } = require('../controllers/RecipeController')

/**
 * Read Only Permission Routes
 */

// GET all ducks
router.get('/', getAllRecipes)
router.get('/:id', getRecipeByID)
 
 module.exports = router; // Export the router to be used in other parts of the application
 
