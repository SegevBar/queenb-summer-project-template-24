const fs = require('fs');
const path = require('path');
const Recipe = require('../models/domain/RecipeModel');
function initializeRecipesDatabase() {
  try {

    const categoriesNames = this.getItems("");

    for (const categoryName of categoriesNames) {
      const recipesNames = this.getItems(categoryName); //need to add Data.json file in any category folder with Items key and valus

      for (const recipeTitle of recipesNames) {
        //const actionsNames = this.getItems(recipeTitle);

        if (!this._recipeRepository.exists(recipeTitle)) { //add exists method
          let recipeToAdd = this.getRecipe(recipeTitle);

          insertRecipe(recipeToAdd); //maybe insert await

        } else {
            //think what to do in this case
          const recipeToCheck = this._recipeRepository.getRecipeByName(recipeTitle); //add getRecipeByName method

          // this._recipeRepository.save(recipeToCheck);
          //const actions = this.getAndSaveRecipeAction(actionsNames, recipeToCheck);
          // recipeToCheck.actions = actions;
          this._recipeRepository.save(recipeToCheck);
        }
      }
    }
  } catch (ex) {
    this._logger.error(`An error occurred: ${ex.message}`);
  }
}

function getItems(itemTitle) {
    try {
      const jsonFileData = this.readJson(itemTitle);
  
      if (jsonFileData === null) {
        return null;
      }
  
      const items = jsonFileData.Items;
      return Array.isArray(items) ? items : [];
  
    } catch (ex) {
      this._logger.error(`An error occurred: ${ex.message}`);
      return [];
    }
}

function getRecipe(recipeTitle) {
    try {
      const jsonFileData = this.readJson(recipeTitle);
  
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
    } catch (ex) {
      this._logger.error(`An error occurred: ${ex.message}`);
      return null;
    }
  }

function convertArrayToEnumerable(array) {
  // In JavaScript, arrays are already iterable, so we just return the array
  return array;
}

function readJson(itemTitle) {
  const jsonPath = this.createJsonPathForItem(itemTitle);
  return this.readJsonFile(jsonPath);
}

function createJsonPathForItem(itemTitle) {
  const jsonFileSuffix = 'Data.json';
  const path = this.createPathForItem(itemTitle);
  return path.join(path, jsonFileSuffix);
}

function createPathForItem(itemTitle) {
  const baseDirectory = process.cwd(); // Equivalent to AppDomain.CurrentDomain.BaseDirectory
  const baseDir = path.join(baseDirectory, 'Data');
  return itemTitle ? path.join(baseDir, itemTitle) : baseDir;
}

function readJsonFile(filePath) {
  const jsonContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonContent);
}

async function insertRecipe(recipe) {
    try {
      const savedRecipe = await recipe.save();
      console.log('Recipe saved successfully:', savedRecipe);
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  }
