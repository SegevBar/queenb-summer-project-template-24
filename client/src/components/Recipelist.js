import { Link } from 'react-router-dom';

const Recipelist = (props) => {
    const recipes = props.recipes;
    const title = props.title;

    return (
        <div className="recipe-list">
            <h2>{title}</h2>
            {recipes.map((recipe) => (
                <div className="recipe-preview" key={recipe._id}>
                    <Link to={`/recipes/${recipe._id}`}> {/* Use recipe._id here */}
                        <h2>{recipe.title}</h2>
                        <p>Written by {recipe.userName}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Recipelist;
