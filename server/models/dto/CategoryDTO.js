class CategoryDTO {
  constructor(category) {
    this.id = category._id;
    this.title = category.title;
    this.recipes = category.recipes || [];
  }

  static fromCategory(category) {
    return new CategoryDTO(category);
  }

  static fromCategories(categories) {
    return categories.map(category => CategoryDTO.fromCategory(category));
  }
}

module.exports = CategoryDTO;
