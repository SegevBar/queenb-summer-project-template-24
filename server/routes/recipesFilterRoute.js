const express = require('express');
const router = express.Router();

const { 
    getRecepiesByIngredients 
} = require('../controllers/recipesFilterController')


// GET recipes by category and ingredients
router.get('/', getRecepiesByIngredients); 

module.exports = router;
