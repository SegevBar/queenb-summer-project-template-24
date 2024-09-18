const express = require('express');
const { 
    getRecepiesByIngredients 
} = require('../controllers/recipesFilterController')

const router = express.Router();

// GET recipes by category and ingredients
router.get('/', getRecepiesByIngredients); 

module.exports = router;
