import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'; // Adjust the import path here
import styles from '../../styles/App.module.css';

const HomePage = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>Omer's Test Home Page</h1>

      {user && (
        <div>
          <Link to="/addContent">
            <button className={styles.addContentButton}>Add Content</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
