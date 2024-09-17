const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const RecipeManager = require('./databaseManager/recipeManager');
const recipesRoutes = require('./routes/recipes'); // Import the recipes routes
const userRoutes = require('./routes/user');

dotenv.config();

// Constants
const PORT = process.env.PORT || 5000; // Use the environment variable or default to 5000

// Create Express server
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
// Mount the routes for recipes and user
app.use('/api/recipes', recipesRoutes); // Add this line to mount recipes routes
app.use('/api/user', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Initialize recipes database
    await RecipeManager.initializeRecipesDatabase();
  })
  .then(() => {
    // Listen for requests
    app.listen(PORT, () => {
      console.log('Connected to MongoDB & listening on port', PORT);
    });
  }).catch((err) => {
    console.log(err);
  });
