/**
 * This module sets up routes for handling recipe-related requests in an Express application.
 * It uses Express Router to define endpoints for retrieving all recipes and a specific recipe by ID.
 * The routes are linked to a MongoDB model, allowing interaction with the database.
 * 
 * Key functionalities include:
 * 1. Handling GET requests to retrieve all recipes.
 * 2. Handling GET requests to retrieve a single recipe by its ID.
 * 3. Error handling to manage potential issues during data fetching.
 * 4. Logging requests and errors for debugging purposes.
 * 
 * Routes:
 * - GET /api/recipes: Retrieves all recipes from the database.
 * - GET /api/recipes/:id: Retrieves a recipe by its ID from the database.
 */

 const express = require('express'); // Importing the express framework
 const Recipe = require('../models/Recipe'); // Importing the Recipe model for database interactions
 
 const router = express.Router(); // Creating an instance of the Express Router
 
 // GET all recipes
 router.get('/', async (req, res) => {
   console.log('Received request for all recipes'); // Log statement to indicate a request for all recipes
   try {
     const recipes = await Recipe.find(); // Fetch all recipes from the database
     res.status(200).json(recipes); // Respond with the recipes and a 200 OK status
   } catch (error) {
     console.error('Error fetching recipes:', error); // Log any errors encountered during the fetch
     res.status(500).json({ message: 'Failed to fetch recipes', error }); // Respond with a 500 Internal Server Error status and error details
   }
 });
 
 // GET a single recipe by ID
 router.get('/:id', async (req, res) => {
   console.log(`Received request for recipe with ID: ${req.params.id}`); // Log statement indicating a request for a specific recipe by ID
   try {
     const recipe = await Recipe.findById(req.params.id); // Fetch the recipe by ID from the database
     if (!recipe) {
       return res.status(404).json({ message: 'Recipe not found' }); // Respond with a 404 Not Found status if no recipe is found
     }
     res.status(200).json(recipe); // Respond with the found recipe and a 200 OK status
   } catch (error) {
     console.error('Error fetching recipe:', error); // Log any errors encountered during the fetch
     res.status(500).json({ message: 'Failed to fetch recipe', error }); // Respond with a 500 Internal Server Error status and error details
   }
 });
 
 module.exports = router; // Export the router to be used in other parts of the application
 