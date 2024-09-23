const express = require('express');
const {
  getAllRecipes,
  addRecipe,
  deleteRecipe
} = require('../controllers/RecipesController');
const requireAuth = require('../middleware/requireAuth'); // Import the middleware

const router = express.Router();

// GET all recipes (no auth required)
router.get('/', getAllRecipes);

// POST a new recipe (auth required)
router.post('/', requireAuth, addRecipe);

// DELETE a recipe (auth required)
router.delete('/:id', requireAuth, deleteRecipe);

module.exports = router;
