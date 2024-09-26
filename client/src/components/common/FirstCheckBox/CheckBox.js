import React from 'react';
import styles from './CheckBox.module.css';

const CheckBox = ( { checkBoxName, filterType, selectedOptions, handleChange }) => {
  return (
    <label className={styles}>
        <input
            key={checkBoxName}
            type="checkbox"
            name={checkBoxName}
            checked={selectedOptions[filterType]?.includes(checkBoxName)|| false}
            onChange={handleChange}
        />
        {checkBoxName}
    </label>
    
  );
};

export default CheckBox;