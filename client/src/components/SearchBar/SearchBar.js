import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

const SearchBar = ({ setResults }) => {
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const handleSearch = () => {
            // if (searchTerm) {
                fetch(`http://localhost:5000/api/recipes?search_title=${searchTerm}`)
                .then((response) => response.json())
                .then((data) => {
                setResults(data);
                })
                .catch((error) => {
                console.error('Error fetching recipes:', error);
                });
            // }
          }
        handleSearch()
      }, [searchTerm])

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
      />
      {/* <button onClick={handleSearch}>Search</button> */}
    </div>
  );
};

export default SearchBar;