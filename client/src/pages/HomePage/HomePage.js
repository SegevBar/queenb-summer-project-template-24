import React from 'react';
import styles from './Home.module.css';
import womenswear from './Womenswear.png';
import menswear from './Menswear.png';
import { Link } from 'react-router-dom';



const Home = () => {
  return (
    <div className={styles.home}>
      <Link to= "/items/women" className={styles.imgLink}> 
        <img src={womenswear} alt="Womenswear" className={styles.womensImg} />
      </Link>
      <Link to="/items/men" className={styles.imgLink}> 
        <img src={menswear} alt="Menswear" className={styles.mensImg} />
      </Link>
    </div>
  );
};

export default Home;
