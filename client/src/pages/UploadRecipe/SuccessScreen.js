import React from 'react';
import './SuccessScreen.css'; // Make sure to import the CSS file

const SuccessScreen = () => {
  return (
    <div className="success-container">
      <h2>Successfully Upload Your Content</h2>
      <div className="checkmark-container">
        <span className="checkmark">&#10003;</span> {/* Unicode checkmark symbol */}
      </div>
    </div>
  );
};

export default SuccessScreen;
