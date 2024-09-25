import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; 
import FirstButton from '../common/FirstButton/FirstButton';

const Navbar = () => {
  return (
      <nav className={styles.appNav}>
        <Link to="/">
          <img src="/project-logo.png" alt="Logo" className={styles.appLogo} />
        </Link>
        <div className={styles.menu}>
          <Link to="/" className={styles.appLink}>Home</Link>
          <Link to="/upload" className={styles.appLink}>Upload</Link>
          <Link to="/items/women" className={styles.appLink}>Womens</Link>
          <Link to="/items/men" className={styles.appLink}>Mens</Link>
          <FirstButton className={styles.navButton}>Login/Sign Up</FirstButton>
        </div>
      </nav>
  );
};

export default Navbar;
