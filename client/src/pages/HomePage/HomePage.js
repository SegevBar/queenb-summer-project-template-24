import React from 'react';
import styles from './Home.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';


const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Omer's Test</h1>
    </div>
  )
}

export default Home;
