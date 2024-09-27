import React, { useState } from 'react';
import styles from './Home.module.css';
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResultsList from "../../components/SearchResultsList/SearchResultsList";

const Home = () => {
  const [results, setResults] = useState([]);

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Recepies Website</h1>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results} />
        {/* {results && results.length > 0 && <SearchResultsList results={results} />} */}
      </div>
    </div>
  );
};

export default Home;
