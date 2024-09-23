const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, required: true },
  level: String,
  type: String,
  ingredients: String, // You have ingredients as a single string in your document
  instructions: String,
  tags: [String],  // Array of strings
  publicationDate: Date,
  userName: String
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
