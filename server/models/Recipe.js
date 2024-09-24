const mongoose = require('mongoose');

// Define the Recipe schema
const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  tags: [String],
  imageFile: {
    type: String,
  },
  videoLink: {
    type: String,
  },
  publicationDate: {
    type: Date,
    default: Date.now,
  },
  userName: {
    type: String,
  },
});

// Create the Recipe model from the schema
const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;