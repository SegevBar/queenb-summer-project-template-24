class IngredientDTO {
  constructor(ingredient) {
    this.id = ingredient._id;
    this.ingredient = ingredient.ingredient;
    this.recipes = ingredient.recipes || [];
  }

  static fromIngredient(ingredient) {
    return new IngredientDTO(ingredient);
  }

  static fromIngredients(ingredients) {
    return ingredients.map(ingredient => IngredientDTO.fromIngredient(ingredient));
  }
}

module.exports = IngredientDTO;
