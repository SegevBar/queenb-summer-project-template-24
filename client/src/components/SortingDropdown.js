import React from 'react';

const SortingDropdown = ({ onSortChange }) => {
  return (
    <div>
       <select onChange={(e) => onSortChange(e.target.value)}> 
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
        <option value="newToOld">Newest First</option>
        <option value="oldToNew">Oldest First</option>
      </select>
    </div>
  );
};

export default SortingDropdown;
