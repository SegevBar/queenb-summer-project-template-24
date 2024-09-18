router.get('/recipes/filter', async (req, res) => {
    const { ingredients } = req.query;
  
    if (!ingredients) {
      return res.status(400).json({ error: 'Ingredients are required' });
    }

const ingredientList = ingredients.split(',');

try {
  const recipes = await Recipe.find({
    ingredients: { $all: ingredientList }
  });
  res.json(recipes);
} catch (error) {
  res.status(500).json({ error: 'Failed to filter recipes' });
}
});

const getRecepiesByIngredients = async (req, res) => {
    const { category } = req.query;  // Extract category from query params

    try {
        // If category is 'all', return all recipes, otherwise filter by category
        const query = category === 'all' ? {} : { categories: category };

        // Fetch recipes from MongoDB
        const recipes = await Recipe.find(query);
        
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

