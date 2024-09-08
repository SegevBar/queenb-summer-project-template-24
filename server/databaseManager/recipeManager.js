const fs = require('fs');
const path = require('path');
const Recipe = require('../models/domain/RecipeModel');

class RecipeManager {
  static baseDir = `${process.cwd()}/Data`;
  static jsonDataFileSuffix = 'Data.json';
  static jsonFileSuffix = '.json';

  // Add recipes data to database
  static async initializeRecipesDatabase() {
    try {
      const categoriesTitles = RecipeManager.getCategories();

      for (const categoryTitle of categoriesTitles) {
        const recipesTitles = RecipeManager.getRecipes(categoryTitle);

        for (const recipeTitle of recipesTitles) {
          if (!await RecipeManager.exists(recipeTitle)) {
            const recipeToInsert = RecipeManager.getRecipe(recipeTitle, categoryTitle);

            await RecipeManager.insertRecipe(recipeToInsert); //maybe insert await
          } else {
            //think if we need this case
          }
        }
      }
    } catch (err) {
      console.log(`An error occurred: ${err.message}`);
    }
  }
  // Get categories from json file
  static getCategories() {
    try {
      const jsonPath = `${RecipeManager.baseDir}/${RecipeManager.jsonDataFileSuffix}`; //"Data/Data.json"
      const jsonFileData = RecipeManager.readJsonFile(jsonPath);
  
      if (jsonFileData === null) {
        return null;
      }
      const items = jsonFileData.Items;
      return Array.isArray(items) ? items : [];
  
    } catch (err) {
      console.log(`An error occurred: ${err.message}`);

      return [];
    }
  }

  // Get recipes from json file
  static getRecipes(categoryTitle) {
    try {
      const jsonPath = `${RecipeManager.baseDir}/${categoryTitle}/${RecipeManager.jsonDataFileSuffix}`; //"Data/{categoryTitle}/Data.json"
      const jsonFileData = RecipeManager.readJsonFile(jsonPath);
  
      if (jsonFileData === null) {
        return null;
      }
      const items = jsonFileData.Items;
      return Array.isArray(items) ? items : [];
  
    } catch (err) {
      console.log(`An error occurred: ${err.message}`);

      return [];
    }
  }

  // Get recipe object from json file
  static getRecipe(recipeTitle, categoryTitle) {
    try {
      const jsonPath = `${RecipeManager.baseDir}/${categoryTitle}/${recipeTitle}${RecipeManager.jsonFileSuffix}`; //"Data/{categoryTitle}/{recipeTitle}.json"
      const jsonFileData = RecipeManager.readJsonFile(jsonPath);
    
      if (jsonFileData === null) {
        return null;
      }
  
      const recipe = new Recipe({
        id: jsonFileData._id || '',
        title: jsonFileData.title || '',
        categories: jsonFileData.categories || [],
        imageUrl: jsonFileData.imageUrl || '',
        ingredients: (jsonFileData.ingredients || []).map(ing => ({
          ingredient: ing.ingredient || '',
          quantity: ing.quantity || ''
        })),
        totalTime: jsonFileData.totalTime || 0,
        instructions: jsonFileData.instructions || [],
        createdBy: jsonFileData.createdBy || null
      });
      
      return recipe;
    } catch (err) {
      console.log(`An error occurred: ${err.message}`);

      return null;
    }
  }
  
  // Read json file
  static readJsonFile(filePath) {
    const jsonContent = fs.readFileSync(filePath, 'utf8');

    return JSON.parse(jsonContent);
  }

  // Check if recipe exists already in database
  static async exists(recipeTitle) {
    try {
      const existingRecipe = await Recipe.findOne({ title: recipeTitle });
      
      return !!existingRecipe; // If existingRecipe is truthy (not null, undefined, 0, false, or an empty string), !!existingRecipe will return true
    } catch (error) {
      console.error('Error checking if recipe exists:', error);

      return false;
    }
  }

  // Insert recipe to database
  static async insertRecipe(recipeToInsert) {
    try {
      //const savedRecipe = await Recipe.insertOne(recipeToInsert);
      const savedRecipe = await recipeToInsert.save();

      console.log('Recipe saved successfully:', savedRecipe.title);
    } catch (err) {
      console.error(`Error saving recipe "${recipeToInsert.title}":`, err);
      // Optionally: throw err; // Re-throw if you want calling code to handle it
    }
  }
}

module.exports = RecipeManager;
