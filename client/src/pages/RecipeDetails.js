import { useParams } from "react-router-dom";  // Import the 'useParams' hook from react-router-dom to get dynamic URL parameters
import useFetch from '../useFetch';  // Import the custom 'useFetch' hook for fetching data

const RecipeDetails = () => {
    const { id } = useParams();  // Extract the 'id' parameter from the URL using the 'useParams' hook. This will allow us to fetch details for a specific recipe.

    const url = process.env.REACT_APP_API_URL + '/recipes/' + id;  // Construct the API URL dynamically by adding '/recipes/' and the 'id' to the base URL from environment variables (REACT_APP_API_URL).

    const { data: recipe, error, isLoading } = useFetch(url);  // Call 'useFetch' with the constructed URL to get the recipe data.

    return (
        <div className="recipe-details">
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            
            {recipe && (
                <article>
                    <h2>{recipe.title}</h2>
                    <p>Written by {recipe.userName}</p>

                    <div>
                        <h3>Ingredients:</h3>
                        {/* Check if ingredients is an array */}
                        {Array.isArray(recipe.ingredients) ? (
                            <ul>  {/* Change from <ol> to <ul> */}
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} style={{ marginBottom: '5px' }}>{ingredient}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No ingredients available</p>  // Handle cases where ingredients might not be an array
                        )}

                        <h3>Instructions:</h3>
                        <p>{recipe.instructions}</p>

                        <h3>Tags:</h3>
                        <p>{recipe.tags.join(', ')}</p>

                        <p>Published on: {new Date(recipe.publicationDate).toLocaleDateString()}</p>
                    </div>
                </article>
            )}
        </div>
    );
};

export default RecipeDetails; 
