import React, { useContext } from 'react';
import styles from './DisplayAnimals.module.css';
import { AnimalContext } from '../../context/AnimalContext';
import AnimalItem from '../AnimalItem/AnimalItem'


const DispalyAnimals = () => {
  const { animals, getAllAnimals} = useContext(AnimalContext);

  if (!animals) return null;

  console.log("animals", animals)
  return (
    <div className={styles.container}>
        {animals && animals.map((animals) =>(
                <AnimalItem key={animals.id} animals={animals}/> )
          )}
    </div>
    
  );
};

export default DispalyAnimals;
