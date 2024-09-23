const express = require('express');
const Recipe = require('../models/Recipe');

const router = express.Router();

// GET all recipes
router.get('/', async (req, res) => {
  console.log('Received request for all recipes'); // Log statement
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error); // Log the error
    res.status(500).json({ message: 'Failed to fetch recipes', error });
  }
});

// GET a single recipe by ID
router.get('/:id', async (req, res) => {
  console.log(`Received request for recipe with ID: ${req.params.id}`); // Log statement
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error); // Log the error
    res.status(500).json({ message: 'Failed to fetch recipe', error });
  }
});

module.exports = router;
