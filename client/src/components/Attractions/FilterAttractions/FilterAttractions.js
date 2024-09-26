import React, {useState, useEffect, useContext} from 'react';
import styles from './FilterAttractions.module.css'; // Adjust the path if needed
import FilterType from './FilterType';
import {fetchFilterValues} from '../../../services/utils';
import { AttractionContext } from '../../../context/AttractionContext';

const FilterAttractions = () => {
    const {filterValuesAttractions, setFilterValuesAttractions} = useContext(AttractionContext);
    const { title, ...options } = filterValuesAttractions;
    const [selectedOptions, setSelectedOptions] = useState(options);
    const [continents, setContinents] = useState([]);
    const [categories, setCategories] = useState([]);

    const getValues = async () => {
        try {
            const { continents, categories } = await fetchFilterValues();

            setContinents(continents);
            setCategories(categories);
        } catch (error) {
            console.error('Error fetching filter values:', error);
        }
    }

    useEffect(() => {
        getValues()
        setFilterValuesAttractions((prevOptions) => ({
            ...prevOptions,
            continents: [],
            categories: [],
        }))
    }, []);

    useEffect(() => {
        setSelectedOptions(options);
    }, [filterValuesAttractions]);

    const handleChange = (event, filterType, checkBoxName) => {
        const { checked } = event.target;

        // Update selected options based on filter type - 
        // add or delete from the filter type array
        setSelectedOptions(prevOptions => {
            console.log("prevOptions: ", prevOptions)

            // Ensure that prevOptions[filterType] is always an array
            const currentOptions = prevOptions[filterType] || [];
            // Determine the updated options based on whether the checkbox is checked or not
            const updatedOptions = {
                ...prevOptions,
                [filterType]: checked
                    ? [...currentOptions, checkBoxName]  // Add value if checked
                    : currentOptions.filter(option => option !== checkBoxName) // Remove value if unchecked
            };
            console.log("updatedOptions: ", updatedOptions)
            console.log("in filter com - update home selectedOptions with", checkBoxName, ": ", updatedOptions)
            return updatedOptions;
        });
    };


  return (
    <div className={styles.filtersContainer}>
        <h2 className={styles.filtersTitle}>Filters:</h2>
        {continents.length > 0 && (
            <FilterType 
            type="continents" 
            options={continents}
            selectedOptions={selectedOptions}
            handleChange={handleChange}
            />
        )}
        {categories.length > 0 && (
            <FilterType 
                type="categories"
                options={categories}
                selectedOptions={selectedOptions}
                handleChange={handleChange}
            />
        )}
        <button onClick={() => {
            setFilterValuesAttractions(prevOptions => ({
            ...prevOptions,
            ...selectedOptions,
        }))}}>
            Done
        </button>

    </div>
  );
};

export default FilterAttractions;
