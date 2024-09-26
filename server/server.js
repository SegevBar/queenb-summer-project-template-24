const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const RecipeManager = require('./databaseManager/recipeManager');
const recipesRoutes = require('./routes/recipes')
const recipesFilterRoutes = require('./routes/recipesFilterRoute')


dotenv.config();

// Constants
const PORT = process.env.PORT;

// Create Express server
const app = express();


// Middleware
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL
}));
// app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('Requested path:', req.path); //delete this
  console.log(req.path, req.method)
  next()
})

// Routes
app.use('/api/recipes', recipesRoutes)
// app.use('/api/filter', recipesFilterRoutes) //todo - check what to keep

app.use('/api/filter',recipesFilterRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Initialize recipes database
    await RecipeManager.initializeRecipesDatabase();
  })
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log('connected to mongoDB & listening on port', process.env.PORT)
    })
  }).catch((err) => {
    console.log(err)
  });
