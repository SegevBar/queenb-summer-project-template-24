import { useParams } from "react-router-dom";  // Import the 'useParams' hook from react-router-dom to get dynamic URL parameters
import useFetch from '../useFetch';  // Import the custom 'useFetch' hook for fetching data

const RecipeDetails = () => {
    const { id } = useParams();  // Extract the 'id' parameter from the URL using the 'useParams' hook. This will allow us to fetch details for a specific recipe.

    // Log the full URL to the console for debugging
    const url = process.env.REACT_APP_API_URL + '/recipes/' + id;  // Construct the API URL dynamically by adding '/recipes/' and the 'id' to the base URL from environment variables (REACT_APP_API_URL).

    // Use the 'useFetch' hook to make the API request
    // 'data' is renamed as 'recipe' for better clarity
    // 'error' will store any error messages if the request fails
    // 'isLoading' will be true while the data is being fetched
    const {data: recipe, error, isLoading} = useFetch(url);  // Call 'useFetch' with the constructed URL to get the recipe data.

    return (
        <div className="recipe-details">  {/* Main container for the recipe details */}
            {isLoading && <div>Loading...</div>}  {/* While the data is being fetched, show a loading message */}
            { error && <div>{ error }</div> }  {/* If there's an error, display the error message */}
            
            {/* If the recipe data is successfully fetched, render the details */}
            {recipe && (
                <article>
                    <h2>{recipe.title}</h2>  {/* Display the title of the recipe */}
                    <p>Written by {recipe.userName}</p>  {/* Display the author's username */}

                    <div>
                        <h3>Ingredients:</h3>
                        <p>{recipe.ingredients}</p>  {/* Display the ingredients list */}

                        <h3>Instructions:</h3>
                        <p>{recipe.instructions}</p>  {/* Display the cooking instructions */}

                        <h3>Tags:</h3>
                        {/* Tags are stored as an array, so we use 'join' to turn the array into a comma-separated string */}
                        <p>{recipe.tags.join(', ')}</p>  

                        {/* Format the publication date using 'toLocaleDateString' to make it readable */}
                        <p>Published on: {new Date(recipe.publicationDate).toLocaleDateString()}</p>
                    </div>
                </article>
            )}
        </div>
    );
};

export default RecipeDetails;  // Export the 'RecipeDetails' component to use it elsewhere in the app
