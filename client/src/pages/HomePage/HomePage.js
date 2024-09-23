import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import RandomDuck from '../../components/RandomDuck/RandomDuck';

const Home = () => {
  return (
    <div className={styles.home}>     
      <div className={styles.mainContent}>
        <h1 className={styles.headline}>HOME</h1>
        <RandomDuck />
      </div>
    </div>
  );
};

export default Home;
