import React from 'react';

const SortingDropdown = ({ onSortChange }) => {
  return (
    <div>
      <select onChange={(e) => onSortChange(e.target.value)} style={{ fontSize: '14px' }}> 
        <option value="lowToHigh" style={{ fontSize: '14px' }}>Price: Low to High</option>
        <option value="highToLow" style={{ fontSize: '14px' }}>Price: High to Low</option>
        <option value="newToOld" style={{ fontSize: '14px' }}>Newest First</option>
        <option value="oldToNew" style={{ fontSize: '14px' }}>Oldest First</option>
      </select>
    </div>
  );
};

export default SortingDropdown;
