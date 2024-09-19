const express = require('express');
const {
    getAllRecipes,
    addRecipe,
    deleteRecipe
 } = require('../controllers/RecipesController')

const router = express.Router()

// GET all recipes
router.get('/', getAllRecipes)

// POST a new recipe
router.post('/', addRecipe);

// DELETE a recipe
router.delete('/:id', deleteRecipe);

module.exports = router