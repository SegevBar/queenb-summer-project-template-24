import React from 'react';
import styles from '../../styles/global.css';
import DisplayAnimals from '../../components/DisplayAnimals/DisplayAnimals.js'

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Choose the animal that interests you!</h1>
      <h1 className={styles.headline}>As soon as you click on it, a tab will open for you</h1>
        <DisplayAnimals/>
    </div>
  );
};

export default Home;
