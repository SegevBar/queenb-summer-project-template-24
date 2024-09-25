import React from 'react';
import './FilterSection.css';

const FilterSection = ({ title, options, handleCheckboxChange, selectedOptions }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="filter-section">
      <div className="filter-header" onClick={toggleOptions}>
        <span>{title}</span>
        <span className="plus-icon">{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && (
        <div className="checkbox-container">
          {options.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={handleCheckboxChange}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
