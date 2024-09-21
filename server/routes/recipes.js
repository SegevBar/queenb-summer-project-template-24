const express = require('express');
const {
    getAllRecipes,
    getRecipeByName,
    getAllRecipesInCategory,
    addRecipe,
    deleteRecipe
 } = require('../controllers/recipesController')

const router = express.Router()

// GET all recipes
router.get('/', getAllRecipes)

// GET a single recipe by name
router.get('/search', getRecipeByName)

// GET all recipes in category
router.get('/category/:title', getAllRecipesInCategory)

// POST a new recipe
router.post('/', addRecipe);

// DELETE a recipe
router.delete('/:id', deleteRecipe);

module.exports = router