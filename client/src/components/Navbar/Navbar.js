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
          <Link to="/women" className={styles.appLink}>Womens</Link>
          <Link to="/men" className={styles.appLink}>Mens</Link>
          <Link to="/login" className={styles.appLink}>Log in</Link>
          <Link to="/signup" className={styles.appLink}>Sign up</Link>
        </div>
      </nav>
  );
};

export default Navbar;
