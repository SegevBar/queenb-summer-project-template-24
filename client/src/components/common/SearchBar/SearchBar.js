import styles from './SearchBar.module.css';
import { useEffect, useState, useRef } from "react";
import { FcSearch } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../../services/api'

function SearchBar() {
  // State for search results, input value, and loading state
  const [searchResult, setSearchResult] = useState([]);
  const [key, setKey] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate(); //useNavigate hook, to navigate to a different page on click each recipe
  // Refs for managing search results and latest search key
  const searchResultRef = useRef(null);
  const latestKeyRef = useRef("");

  // Handler for clicking on a recipe in search results
  const handleRecipeClick = (recipe) => {
    //navigate(`/recipe/${encodeURIComponent(recipe.title)}`);
    console.log(recipe.title);
  };

  // Reset scroll position when input loses focus
  const handleInputBlur = () => {
    if (searchResultRef.current) {
      searchResultRef.current.scrollTop = 0;
    }
  };

  // Highlight matching text in search results
  const highlightMatch = (text, key) => {
    if (!key) return text;
    const parts = text.split(new RegExp(`(${key})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === key.toLowerCase() ? 
        <span key={index} className={styles.highlight}>{part}</span> : part
    );
  };

  // Perform search API call
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
    } finally {
      setIsSearching(false);
      // Check if the key has changed during the search
      if (latestKeyRef.current !== searchKey) {
        performSearch(latestKeyRef.current);
      }
    }
  };

  // Effect to trigger search when input changes
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
        {/* Display search results if available */}
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