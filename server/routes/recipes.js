const express = require('express');
const { getAllRecipes,
        searchRecipes,
 } = require('../controllers/RecipeController')

const router = express.Router()

/**
 * Read Only Permission Routes
 */

// GET all ducks
router.get('/', getAllRecipes)

module.exports = router

