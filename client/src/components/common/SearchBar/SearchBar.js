import styles from './SearchBar.module.css';
import { useEffect, useState, useRef } from "react";
import { FcSearch } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../../services/api'

function SearchBar() {
  const [searchResult, setSearchResult] = useState([]);
  const [key, setKey] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate(); //useNavigate hook, to navigate to a different page on click each recipe
  const searchResultRef = useRef(null);
  const latestKeyRef = useRef("");

  const handleRecipeClick = (recipe) => {
    //navigate(`/recipe/${encodeURIComponent(recipe.title)}`);
    console.log(recipe.title);
  };

  const handleInputBlur = () => {
    if (searchResultRef.current) {
      searchResultRef.current.scrollTop = 0;
    }
  };

  const highlightMatch = (text, key) => {
    if (!key) return text;
    const parts = text.split(new RegExp(`(${key})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === key.toLowerCase() ? 
        <span key={index} className={styles.highlight}>{part}</span> : part
    );
  };

  const performSearch = async (searchKey) => {
    setIsSearching(true);
    try {
      if (!searchKey.trim()) {
        setSearchResult([]);
        return;
      }
      const response = await axiosInstance.get('/searchBar', {params: {key: searchKey}});
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
    } finally {
      setIsSearching(false);
      // Check if the key has changed during the search
      if (latestKeyRef.current !== searchKey) {
        performSearch(latestKeyRef.current);
      }
    }
  };

  useEffect(() => {
    latestKeyRef.current = key;
    if (!isSearching) {
      performSearch(key);
    }
  }, [key]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={styles.searchWrapper}>
        <button type="button" className={styles.searchBtn}>
          <FcSearch />
        </button>
        <div className={styles.formGroup}>
          <input 
          type="text"
          className={styles.formControl}
          placeholder="Search recipes..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onBlur={handleInputBlur}
          />
        </div>
        {searchResult && searchResult.length > 0 && (
          <div className={styles.searchResult} ref={searchResultRef}>
            {searchResult.map((recipe) => (
              <div className={styles.searchItem} key={recipe._id}>
                <h3 onClick={() => handleRecipeClick(recipe)}>
                  {highlightMatch(recipe.title, key)}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  )
}

export default SearchBar;