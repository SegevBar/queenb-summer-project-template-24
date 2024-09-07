class RecipeDTO {
  constructor(recipe) {
    this.id = recipe._id;
    this.title = recipe.title;
    this.categories = recipe.categories;
    this.imageUrl = recipe.imageUrl;
    this.ingredients = recipe.ingredients.map(ing => ({
        ingredient: ing.ingredient,
      quantity: ing.quantity
    }));
    this.totalTime = recipe.totalTime;
    this.instructions = recipe.instructions;
    this.createdBy = recipe.createdBy;
  }

  static fromRecipe(recipe) {
    return new RecipeDTO(recipe);
  }

  static fromRecipes(recipes) {
    return recipes.map(recipe => RecipeDTO.fromRecipe(recipe));
  }
}

module.exports = RecipeDTO;
