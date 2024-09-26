const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, required: true },
  level: String,
  type: String,
  ingredients: [String],  // Updated to an array of strings
  instructions: String,
  tags: [String],  // Array of strings
  imageFile: String,  // To store the image file name or path
  videoLink: String,  // To store an optional video link
  publicationDate: Date,
  userName: String
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
