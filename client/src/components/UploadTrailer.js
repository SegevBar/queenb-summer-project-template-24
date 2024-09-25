import React, { useState } from 'react';
import api from '../services/api';
import TrailerForm from './TrailerForm'; 
import { useAuthContext } from "../hooks/useAuthContext";

const UploadTrailer = () => {

  const [trailerName, setTrailerName] = useState('');
  const [trailerStatus, setTrailerStatus] = useState('');
  const [isTrailerAvailable, setIsTrailerAvailable] = useState(false); 
  const { user } = useAuthContext();


  // Function to check if the trailer name exists
  const checkTrailerName = async (name) => {
    console.log('checkTrailerName function called');   
    try {
      const response = await api.post(
        'http://localhost:5000/api/trailer/check-trailer',
        { trailerName: name.toLowerCase() }, 
        { 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}` 
          }
        }
      );

      const result = response.data; // Directly access the data

      if (result.exists) {
        console.log("Error message is being set in the state");
        setTrailerStatus("We're sorry, this trailer already exists in our system, so you can't upload it");
        setIsTrailerAvailable(false);
      } else {
        setTrailerStatus('This trailer does not exist in our database, we will be happy if you add it now, thanks!');
        setIsTrailerAvailable(true);
      }
    } catch (error) {
      console.error('Error checking trailer name:', error);
      setTrailerStatus('Error checking trailer name');
      setIsTrailerAvailable(false);
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    setTrailerName(event.target.value); 
    setTrailerStatus(''); 
  };

  // Handle trailer name check on button click
  const handleCheckClick = () => {

    if (trailerName.trim()) {
      checkTrailerName(trailerName);
    } else {
      setTrailerStatus('Please enter a trailer name.');
      setIsTrailerAvailable(false);
    }
  };

  return (
    <div>
      <h2>Upload Trailer</h2>
      <input
        type="text"
        value={trailerName}
        onChange={handleInputChange}
        placeholder="Enter trailer name"
      />
      <button onClick={handleCheckClick}>Check Trailer Name</button>
      <p>{trailerStatus}</p>
      
      {/* Show TrailerForm only if the trailer is available */}
      {isTrailerAvailable && <TrailerForm />}
    </div>
  );
};

export default UploadTrailer;
