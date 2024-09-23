import React from 'react'; // Only import React here
import Recipelist from '../../components/Recipelist';
import styles from './Home.module.css';
import useFetch from '../../useFetch';

const url = process.env.REACT_APP_API_URL;
const Home = () => {
  const { error, isLoading, data: recipes } = useFetch(url)
    return (
    <div className={styles.home}>
      { error && <div>{ error }</div> }
      {isLoading&&<div>Loading...</div>}
     {recipes&& <Recipelist recipes={recipes} title= "All Recipes"></Recipelist>}
    </div>
  );
};

export default Home;
