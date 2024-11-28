import { useContext , useState } from "react";
import styles from "./UploadAnimalForm.module.css";
import { animalOptions, AnimalContext} from "../../context/AnimalContext"; 
import { AuthContext } from "../../context/AuthContext";

//get max file size
async function fetchMaxFileSize() {
  try {
    const response = await fetch('http://localhost:5000/api/config');
    const data = await response.json();
    return data.maxFileSize; 
  } catch (error) {
    console.error('Error fetching max file size:', error);
  }
}
const validImageExtensions = ['.png', '.jpeg', '.jpg'];
 

const UploadAnimalForm = ({onSubmissionSuccess}) => {

  // State for validation error
  const [validationError, setValidationError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); 
  // create states for each input data
  const [name, setName] = useState('');
  const [ageYears, setAgeYears] = useState('');
  const [ageMonths, setAgeMonths] = useState('');
  const [animal_type, setAnimalType] = useState('');
  const [sex, setSex] = useState('');
  const [images_and_videos, setImagesAndVideos] = useState([""]);
  const [description, setDescription] = useState('');
  const [area_of_adoption, setAreaOfAdoption] = useState('');
  const [color, setColor] = useState('');
  const [get_along_with, setGetAlongWith] = useState('');
  const [breed, setBreed] = useState('');
  const [health_condition, setHealthCondition] = useState('');
  const [spay_neuter, setSpayOrNeuter] = useState('');
  const [error, setError] = useState('');

  //context
  const { user } = useContext(AuthContext); // Access the current active user
  // Access cities from context
  const { cities } = useContext(AnimalContext);
  
  // Check if user is defined before accessing user_id
  if (!user) {
    return <div>Please log in to upload an animal.</div>;
  }

  const userID = user._id; // Get user ID
  console.log(userID)

  // Handle form submission
  const handleAnimalSubmit = async (e) => {
    
    e.preventDefault(); //don't refresh the page
    setIsSubmitted(true);

    // Check required fields
    if (!name || !animal_type || !sex || !description || !area_of_adoption || !color ||(images_and_videos.length === 0) || (!ageMonths && !ageYears)) {
      setValidationError('Not all required fields are filled.');
      return;
    }
    // Reset validation error if everything is filled
    setValidationError('');
    
    const formData = new FormData();
  
    // Append fields to formData
    formData.append('name', name);
    formData.append('ageYears', ageYears);
    formData.append('ageMonths', ageMonths);
    formData.append('sex', sex);
    formData.append('animal_type', animal_type);
    formData.append('description', description);
    formData.append('contact_user', userID);
    formData.append('area_of_adoption', area_of_adoption);
    formData.append('color', color);
    formData.append('get_along_with', get_along_with);
    formData.append('breed', breed);
    formData.append('health_condition', health_condition);
    formData.append('spay_neuter', spay_neuter);
    images_and_videos.forEach((file) => {
      formData.append('images_and_videos', file);
    });
    
    try {
      setLoading(true); // Set loading to true when submission starts
      setError("");
      // Make the POST request to the server
      const response = await fetch('http://localhost:5000/api/animals/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error from server:', errorText);
        // Check for specific error messages
        if (errorText.includes('Invalid file type')) {
          setError('Invalid file type. Please upload images (PNG, JPEG, JPG) or videos (MP4, WEBM, OGG, MOV).');
        } else if (errorText.includes('too large')) {
          // Check if the response is not OK
          const maxFileSize = await fetchMaxFileSize();
          setError(`The file you uploaded is too large. Please ensure it is under ${(maxFileSize / (1024 * 1024)).toFixed(2)} MB.`);
        } else {
          setError('An error occurred while uploading. Please try again.');
        }
        setLoading(false);
        return;
      }
      // If response is OK, parse it as JSON
      const json = await response.json();
      const { animal } = json;


      // reset form after successful response
      setName('');
      setAgeYears(0);
      setAgeMonths(0);
      setSex('');
      setAnimalType('');
      setImagesAndVideos([]);
      setDescription('');
      setAreaOfAdoption('');
      setColor('');
      setGetAlongWith('');
      setBreed('');
      setHealthCondition('');
      setSpayOrNeuter('');
      setError(null);
      console.log("New animal added:", json);

      
      // Find the first valid image in the array
      const imageFile = images_and_videos.find(file => 
        validImageExtensions.some(extension => file.name.toLowerCase().endsWith(extension))
      ) || ""; // If no valid image found, set to empty string
      const image = imageFile ? imageFile.name : "";
      onSubmissionSuccess({ name, image, animal_id: animal.animal_id })  //changed status to submitted and pass param
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unable to submit the form. Please check your network or server.');
    } finally {
      setLoading(false); // Set loading to false when submission ends
    }
  };


  // Handle images input change
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    setImagesAndVideos(files); 
  };

  // Generate arrays for age dropdown options
  const years = Array.from({ length: 51 }, (_, i) => i); // 0 to 50 years
  const months = Array.from({ length: 12 }, (_, i) => i); // 0 to 11 months


  return (
    <form className={styles.form} onSubmit={handleAnimalSubmit} noValidate>
      <h3 className={styles.title}>Add a New Animal!</h3>
      <div className={styles.field}>
        <label className={`${!name && isSubmitted ? styles.errorLabel : styles.label}`}>
            Animal Name*
        </label>
        <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
        />
      </div>
      <div className={styles.field}>
        <label className={`${!ageMonths && !ageYears && isSubmitted ? styles.errorLabel : styles.label}`}>
          Age*
        </label>
        <div className={styles.ageFields}>
          <select
            onChange={(e) => setAgeYears(e.target.value)}
            value={ageYears}
          >
            <option value="" disabled>Select Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select
            onChange={(e) => setAgeMonths(e.target.value)}
            value={ageMonths}
          >
            <option value="" disabled>Select Months</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.field}>
        <label className={`${!sex && isSubmitted ? styles.errorLabel : styles.label}`}>
          Sex*
        </label>
        <select
          onChange={(e) => setSex(e.target.value)}
          value={sex}
        >
          <option value="" disabled hidden></option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
      </div>
      <div className={styles.field}>
        <label className={`${!animal_type && isSubmitted ? styles.errorLabel : styles.label}`}>
          Animal Type*
        </label>
        <select onChange={(e) => setAnimalType(e.target.value)} value={animal_type}>
          {animalOptions.map((animal, index) => (
            <option 
              key={index} 
              value={animal.value} 
              disabled={animal.disabled} 
              hidden={animal.hidden}
            >
              {animal.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label className={`${!description && isSubmitted ? styles.errorLabel : styles.label}`}>
          Description*
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>
      <div className={styles.field}>
        <label className={`${!area_of_adoption && isSubmitted ? styles.errorLabel : styles.label}`}>
          Area of Adoption*
        </label>
        <select
          onChange={(e) => setAreaOfAdoption(e.target.value)}
          value={area_of_adoption}
          required
        >
          <option value="" disabled hidden></option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label className={`${!color && isSubmitted ? styles.errorLabel : styles.label}`}>
          Color*
        </label>
        <input
          type="text"
          onChange={(e) => setColor(e.target.value)}
          value={color}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Get Along With</label>
        <input
          type="text"
          onChange={(e) => setGetAlongWith(e.target.value)}
          value={get_along_with}
        />
      </div>
      <div className={styles.field}>
        <label>Breed</label>
        <input
          type="text"
          onChange={(e) => setBreed(e.target.value)}
          value={breed}
        />
      </div>
      <div className={styles.field}>
        <label>Health Condition</label>
        <input
          type="text"
          onChange={(e) => setHealthCondition(e.target.value)}
          value={health_condition}
        />
      </div>
      <div className={styles.field}>
        <label>Spay/Neuter</label>
        <select
          type="text"
          onChange={(e) => setSpayOrNeuter(e.target.value)}
          value={spay_neuter}
        >
          <option value="" disabled hidden></option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
          <option value="Don't know">Don't Know</option>
        </select>
      </div>
      <div className={styles.field}>
        <label className={`${(images_and_videos[0]==="") && isSubmitted ? styles.errorLabel : styles.label}`}>
          Upload Images and Videos*
        </label>
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg, video/mp4, video/webm, video/ogg, video/quicktime"
          onChange={handleFiles}
          required
        />
      </div>
      {validationError && <div className={styles.validationError}>{validationError}</div>}
      {loading && <div className={styles.loading}>Loading... Please wait</div>}
      <div className={styles.submitButton}>
      <button type="submit">Upload Animal</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default UploadAnimalForm;
