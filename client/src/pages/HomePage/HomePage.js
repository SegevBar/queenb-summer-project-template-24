import React from 'react'; // Importing React to enable JSX syntax and component creation
import Recipelist from '../../components/Recipelist'; // Importing the Recipelist component to display the list of recipes
import styles from './Home.module.css'; // Importing CSS module for scoped styles specific to the Home component
import useFetch from '../../useFetch'; // Importing a custom hook (useFetch) to fetch data from an API

// Getting the API URL from environment variables (specified in the .env file)
const url = process.env.REACT_APP_API_URL + '/recipes'; // Ensure your environment variable is set correctly


const Home = () => {
  // Using the custom useFetch hook to fetch data (recipes) from the given URL
  // The hook returns the following states:
  // - error: if there was a problem with the fetch request
  // - isLoading: whether the data is still being fetched
  // - data (renamed as recipes): the actual fetched data
  const { error, isLoading, data: recipes } = useFetch(url);

  return (
    <div className={styles.home}>
      {/* Display an error message if there's an error during fetching */}
      { error && <div>{ error }</div> }

      {/* Display a loading message while the data is still being fetched */}
      { isLoading && <div>Loading...</div> }

      {/* Once the data is successfully fetched, pass the recipes data to the Recipelist component */}
      { recipes && <Recipelist recipes={recipes} title="All Recipes"></Recipelist> }
    </div>
  );
};

export default Home;
