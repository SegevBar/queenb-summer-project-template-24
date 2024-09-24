import "./SearchResultsList.css";
import { SearchResult } from "../SearchResult/SearchResult";
import React from "react";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="search-results-list">
      {results.length === 0 ? (
        <p className="no-results-message">No recipes found</p>
      ) : (
        results.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <div className="recipe-details">
              <p><strong>Level:</strong> {recipe.level}</p>
              <p><strong>Type:</strong> {recipe.type}</p>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
              </p>
              <p className="recipe-instructions">
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResultsList;