const Recipe = require('../models/Recipe');

// get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const searchQuery = req.query.search_title;
    // console.log(searchQuery)
    if (searchQuery){
      const recipes = await Recipe.find({ 
        title: { $regex: searchQuery, $options: 'i' } // case-insensitive search
      });
      res.status(200).json(recipes);
      // console.log(recipes)
      return;
    }
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(400).json({mssg: 'error getting recipes', err})
  }
}

// // Get recipes by name (search query)
// const searchRecipes = async (req, res) => {
//     const searchQuery = req.query.search;
//     try {
//       const recipes = await Recipe.find({ 
//         title: { $regex: searchQuery, $options: 'i' } // case-insensitive search
//       });
//       res.json(recipes);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching recipes' });
//     }
//   };


module.exports = {
  getAllRecipes,
  // searchRecipes,
}