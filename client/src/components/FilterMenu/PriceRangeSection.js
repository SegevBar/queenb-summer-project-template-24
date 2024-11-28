import React from 'react';
import './FilterSection.css';
import { Slider } from '@mui/material';

const PriceRangeSection = ({ title, priceRange, handlePriceChange }) => {
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
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1001} // Adjust the max value based on your needs
          style={{ width: '180px', margin: '10px auto' }} // Inline style to adjust width
        />
      )}
    </div>
  );
};

export default PriceRangeSection;
