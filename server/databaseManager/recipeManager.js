const fs = require('fs');
const path = require('path');
const Recipe = require('../models/domain/RecipeModel');

class RecipeManager {
  // Add recipes data to database
  static initializeRecipesDatabase() {
    try {
      const categoriesNames = RecipeManager.getItems("");

      for (const categoryName of categoriesNames) {
        const recipesNames = RecipeManager.getItems(categoryName);

        for (const recipeTitle of recipesNames) {
          if (!RecipeManager.exists(recipeTitle)) {
            const recipeToAdd = RecipeManager.getRecipe(recipeTitle);

            RecipeManager.insertRecipe(recipeToAdd); //maybe insert await
          } else {
            //think if we need this case
          }
        }
      }
    } catch (err) {
      console.log(`An error occurred: ${err.message}`);
    }
  }

  // Get items from json file
  static getItems(itemTitle) {
    try {
      const jsonFileData = RecipeManager.readJson(itemTitle);
  
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

  // Read json file
  static readJson(itemTitle) {
    const jsonPath = RecipeManager.createJsonPathForItem(itemTitle);
    
    return RecipeManager.readJsonFile(jsonPath);
  }

  // Create json path for item
  static createJsonPathForItem(itemTitle) {
    const jsonFileSuffix = 'Data.json';
    const path = RecipeManager.createPathForItem(itemTitle);

    return path.join(path, jsonFileSuffix);
  }

  // Create path for item
  static createPathForItem(itemTitle) {
    const baseDirectory = process.cwd();
    const baseDir = path.join(baseDirectory, 'Data');

    return itemTitle ? path.join(baseDir, itemTitle) : baseDir;
  }

  // Read json file
  static readJsonFile(filePath) {
    const jsonContent = fs.readFileSync(filePath, 'utf8');

    return JSON.parse(jsonContent);
  }

  // Check if recipe exists already in database
  static async exists(recipeTitle) {
    const recipe = await Recipe.find(x => x.title === recipeTitle);

    return recipe !== null;
  }

  // Get recipe object from json file
  static getRecipe(recipeTitle) {
    try {
      const jsonFileData = RecipeManager.readJson(recipeTitle);
  
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
        createdBy: jsonFileData.createdBy || ''
      });
      
      return recipe;
    } catch (err) {
      console.log(`An error occurred: ${err.message}`);

      return null;
    }
  }

  // Insert recipe to database
  static async insertRecipe(recipe) {
    try {
      const savedRecipe = await recipe.save();
      console.log('Recipe saved successfully:', savedRecipe.title);
    } catch (err) {
      console.error(`Error saving recipe "${recipe.title}":`, err);
      // Optionally: throw err; // Re-throw if you want calling code to handle it
    }
  }
}

module.exports = RecipeManager;
