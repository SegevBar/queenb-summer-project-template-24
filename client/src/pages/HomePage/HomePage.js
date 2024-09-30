
import React, { useContext } from 'react';
import styles from '../../styles/global.css';
import DisplayAnimals from '../../components/DisplayAnimals/DisplayAnimals.js'
import { AuthContext} from '../../context/AuthContext';


//      <h1 className={styles.headline}>As soon as you click on it, a tab will open for you</h1>

const Home = () => {
  const { user } = useContext(AuthContext); // current user
  return (
    <div className={styles.home}>
      {/* greet the user if they are logged in */}
      {user && <h2 className={styles.greeting}>Hi, {user.name}!</h2>} 
      <h1 className={styles.headline}>Choose the animal that interests you!</h1>
        <DisplayAnimals/>
    </div>
  );
};

export default Home;
