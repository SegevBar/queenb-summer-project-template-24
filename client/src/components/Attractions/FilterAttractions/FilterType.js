import React from 'react';
import styles from './FilterAttractions.module.css'; // Adjust the path if needed
import CheckBox from '../../common/FirstCheckBox/CheckBox';

const FilterType = ({ type, options, selectedOptions, handleChange }) => {

    return(
        <div>
            <h3 className={styles.filterTypeTitle}>{type.charAt(0).toUpperCase() + type.slice(1)}:</h3>
            {options.map((op) => (
                <CheckBox
                    key={op} // Unique key for each checkbox
                    checkBoxName={op}
                    filterType={`${type}`}
                    selectedOptions={selectedOptions}
                    handleChange={(e)=>handleChange(e, `${type}`, op)}
                />
            ))}
        </div>
    )
}

export default FilterType