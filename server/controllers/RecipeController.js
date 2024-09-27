const Recipe = require('../models/Recipe');

// get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const searchQuery = req.query.search_title;
    // console.log(searchQuery)
    if (searchQuery){
      const recipes = await Recipe.find({ 
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },       // case-insensitive search in title
          { ingredients: { $regex: searchQuery, $options: 'i' } } , // Search in ingredients
          { level: { $regex: searchQuery, $options: 'i' } } , // Search in level
          { type: { $regex: searchQuery, $options: 'i' } } , // Search in type
          { instructions: { $regex: searchQuery, $options: 'i' } } , // Search in instructions
          { tags: { $regex: searchQuery, $options: 'i' } } , // Search in tags
          { userName: { $regex: searchQuery, $options: 'i' } } , // Search in userName
        ]
      });

      res.status(200).json(recipes);
      console.log(recipes)
      return;
    }
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
    console.log(recipes)
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