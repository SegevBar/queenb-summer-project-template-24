const express = require('express');
const {
    getAllRecipes,
    addRecipe,
    deleteRecipe
 } = require('../controllers/RecipesController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all recipes
router.get('/', getAllRecipes)

// POST a new recipe
router.post('/', addRecipe);

// DELETE a recipe
router.delete('/:id', deleteRecipe);

module.exports = router