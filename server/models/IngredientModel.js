const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  ingredient: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
