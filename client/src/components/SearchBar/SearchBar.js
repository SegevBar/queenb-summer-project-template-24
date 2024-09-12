import { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../services/api'

function SearchBar() {
  const [searchResult, setSearchResult] = useState([]);
  const [key, setKey] = useState("");
  const navigate = useNavigate(); //useNavigate hook, to navigate to a different page on click each recipe

  const handleRecipeClick = (recipe) => {
    //navigate(`/recipe/${encodeURIComponent(recipe.title)}`);
    console.log(recipe.title);
  };

  useEffect(() => {
    const search = async () => {
      try {
        if (!key.trim()) {
          setSearchResult([]);
          return;
        }
        const response = await axiosInstance.get('/searchBar', {params: {key, limit: 5}});
        setSearchResult(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up request:', error.message);
        }
      }
    };
    search();
  }, [key]);
    return (
        <form>
          <div className="search-Wrapper">
            <button className="search-btn">
              <FcSearch />
            </button>
            <div className="form-group">
              <input 
              type="text"
              className="form-control"
              placeholder="Searching..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              />
            </div>
            {searchResult && searchResult.length > 0 && (
              <div className="search-result">
                {searchResult.map((recipe) => (
                  <div className="search-item" key={recipe._id}>
                    <h3 onClick={() => handleRecipeClick(recipe)}>{recipe.title}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
    )
}

export default SearchBar;