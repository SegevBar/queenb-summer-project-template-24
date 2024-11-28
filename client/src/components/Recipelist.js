import { Link } from 'react-router-dom';

const Recipelist = (props) => {
    const recipes = props.recipes;
    const title = props.title;

    return (
        <div className="recipe-list-container">
            <h2 className="recipe-title">{title}</h2>
            <div className="recipe-list">
                {recipes.map((recipe) => (
                    <div className="recipe-preview" key={recipe._id}>
                        <Link to={`/recipes/${recipe._id}`}>
                            <h3>{recipe.title}</h3>
                            <p>Written by {recipe.userName}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipelist;
