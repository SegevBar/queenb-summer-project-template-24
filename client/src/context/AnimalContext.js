import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AnimalContext = createContext();

const AnimalProvider = ({ children }) => {
    const [animals, setAnimals] = useState(null);
    const [cities, setCities] = useState([]); 

    const getAllAnimals= async () => {
        try {
            const response = await api.get('/animals/');
            setAnimals(response.data);
        } catch (error) {
            console.error('Error fetching the animals:', error);
        }
    };

    // Fetch cities for Israel
    const fetchCities = async () => {
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ country: "Israel" }),
            });
            const result = await response.json();
            if (result && !result.error) {
                setCities(result.data);
            } else {
                console.error('Error fetching cities:', result.msg);
            }
        } catch (err) {
            console.error("Error fetching cities:", err);
        }
    };

    useEffect(() => {
        getAllAnimals();
        fetchCities();
    }, []);

    return (
        <AnimalContext.Provider value={{ animals, getAllAnimals, cities }}>
            {children}
        </AnimalContext.Provider>
    );
};

const animalOptions = [
    { value: "", label: "", disabled: true, hidden: true }, 
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Guinea Pig", label: "Guinea Pig" },
    { value: "Hamster", label: "Hamster" },
    { value: "Bird", label: "Bird" },
    { value: "Fish", label: "Fish" },
    { value: "Reptile", label: "Reptile" },
    { value: "Horse", label: "Horse" },
    { value: "Goat", label: "Goat" },
    { value: "Chicken", label: "Chicken" },
    { value: "Other", label: "Other" },
  ];
  
 

export { AnimalContext, AnimalProvider, animalOptions };
