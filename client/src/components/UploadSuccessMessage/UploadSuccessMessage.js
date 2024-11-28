import styles from "./UploadSuccessMessage.module.css";
import { useContext} from "react";
import { useNavigate } from 'react-router-dom';
import NavButton from "../common/NavButton/NavButton";
import React from "react";
import { AuthContext } from "../../context/AuthContext";


const UploadSuccessMessage = ({ name, image, animal_id, onSubmissionSuccess}) => {

  const { user } = useContext(AuthContext); // current user

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
      <h1 className={styles.title}>{user.name}, thank you for uploading a new Animal!</h1>
      <h2 className={styles.title}>{name} is ready to be adopted</h2>
      {image && (
        <img 
          src={`http://localhost:5000/uploads/${animal_id}_${image}`} 
          alt={image} 
          className={styles.image}
        />
      )}
      <NavButton onClick={handleGoHome}>Home Page</NavButton>
      <NavButton onClick={handleGoUpload}>Upload more!</NavButton>
    </div>
   );
}
 
export default UploadSuccessMessage;