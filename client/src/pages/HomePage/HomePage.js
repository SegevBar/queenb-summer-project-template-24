import React, { useContext } from 'react';
import styles from './Home.module.css';
import DisplayAnimals from '../../components/DisplayAnimals/DisplayAnimals.js';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';  // Import Link for navigation

const Home = () => {
  const { user } = useContext(AuthContext);  // Access user from context

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Happily adopted</h1>

      {user ? (
        // Display animals if user is logged in
        <DisplayAnimals/>
      ) : (
        // Display a prompt to log in or sign up if not logged in
        <div className={styles.authPrompt}>
          <p>Please log in to view adopted animals.</p>
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>  {/* Link to Sign Up page */}
        </div>
      )}
    </div>
  );
};

export default Home;
