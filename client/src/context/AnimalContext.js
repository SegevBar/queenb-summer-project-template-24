import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AnimalContext = createContext();

const AnimalProvider = ({ children }) => {
    const [animals, setAnimals] = useState(null);

    const getAllAnimals= async () => {
        try {
            const response = await api.get('/animals/');
            setAnimals(response.data);
        } catch (error) {
            console.error('Error fetching the animals:', error);
        }
    };

    useEffect(() => {
        getAllAnimals();
    }, []);

    return (
        <AnimalContext.Provider value={{ animals, getAllAnimals }}>
            {children}
        </AnimalContext.Provider>
    );
};

export { AnimalContext, AnimalProvider };
