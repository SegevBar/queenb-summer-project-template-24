import styles from "./UploadSuccessMessage.module.css";
import { useNavigate } from 'react-router-dom';
import NavButton from "../common/NavButton/NavButton";
import React from "react";

const UploadSuccessMessage = ({ name, image, animal_id, onSubmissionSuccess}) => {

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };
  const handleGoUpload = () => {
    onSubmissionSuccess(null); // Reset the submission data
    navigate('/UploadAnimal');
  };

  return (
    <div>
      <h1 className={styles.title}>Thank you for uploading a new Animal!</h1>
      <h2 className={styles.title}>{name} is ready to be adopted</h2>
      <img 
        src={`http://localhost:5000/uploads/${animal_id}_${image}`} 
        alt={image} 
        className={styles.image}
      />
      
      <NavButton onClick={handleGoHome}>Home Page</NavButton>
      <NavButton onClick={handleGoUpload}>Upload more!</NavButton>
    </div>
   );
}
 
export default UploadSuccessMessage;