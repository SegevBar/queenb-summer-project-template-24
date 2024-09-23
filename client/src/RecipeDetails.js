import { useParams } from "react-router-dom";
import useFetch from './useFetch';

const RecipeDetails = () => {
    const url = process.env.REACT_APP_API_URL
    const { id } = useParams();
    
    const {data: recipe ,error,isLoading} = useFetch(url+'/recipes/'+id);
  return (
    <div className="recipe-details">
      {isLoading && <div>Loading...</div>}
      { error && <div>{ error}</div> }
      {recipe&&(
                <article>
                    <h2>{recipe.title}</h2>
                    <p>Written by {recipe.userName}</p>
                    <div>
                        <h3>Ingredients:</h3>
                        <p>{recipe.ingredients}</p>
                        <h3>Instructions:</h3>
                        <p>{recipe.instructions}</p>
                        <h3>Tags:</h3>
                        <p>{recipe.tags.join(', ')}</p> {/* Join tags array into a string */}
                        <p>Published on: {new Date(recipe.publicationDate).toLocaleDateString()}</p>
                    </div>
                </article>
            )}
        </div>
    );
};
export default RecipeDetails;