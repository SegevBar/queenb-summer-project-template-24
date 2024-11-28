import React, { useContext } from 'react';
import styles from './DisplayAnimals.module.css';
import { AnimalContext } from '../../context/AnimalContext';
import AnimalItem from '../AnimalItem/AnimalItem'


const DisplayAnimals = () => {
  const { animals} = useContext(AnimalContext);

  if (!animals) return null;

  console.log("animals", animals)
  return (
    <div className={styles.container}>
        {animals && animals.map((animal) =>(
                <AnimalItem key={animal.id} animals={animal}/> )
          )}
    </div>
    
  );
};

export default DisplayAnimals;
