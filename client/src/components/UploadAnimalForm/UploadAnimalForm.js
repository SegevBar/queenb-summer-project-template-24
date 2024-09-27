import { useEffect, useState } from "react";
import styles from "./UploadAnimalForm.module.css";

const animalOptions = [
  { value: "", label: "", disabled: true, hidden: true }, 
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Rabbit", label: "Rabbit" },
  { value: "Guinea Pig", label: "Guinea Pig" },
  { value: "Hamster", label: "Hamster" },
  { value: "Bird", label: "Bird" },
  { value: "Fish", label: "Fish" },
  { value: "Reptile", label: "Reptile" },
  { value: "Horse", label: "Horse" },
  { value: "Goat", label: "Goat" },
  { value: "Chicken", label: "Chicken" },
  { value: "Other", label: "Other" },
];

const UploadAnimalForm = ({onSubmissionSuccess}) => {

  // State for validation error
  const [validationError, setValidationError] = useState('');

  // create states for each input data
  const [name, setName] = useState('');
  const [ageYears, setAgeYears] = useState('');
  const [ageMonths, setAgeMonths] = useState('');
  const [animal_type, setAnimalType] = useState('');
  const [sex, setSex] = useState('');
  const [images_and_videos, setImagesAndVideos] = useState([]);
  const [description, setDescription] = useState('');
  const [area_of_adoption, setAreaOfAdoption] = useState('');
  const [color, setColor] = useState('');
  const [get_along_with, setGetAlongWith] = useState('');
  const [breed, setBreed] = useState('');
  const [health_condition, setHealthCondition] = useState('');
  const [spay_neuter, setSpayOrNeuter] = useState('');
  const [error, setError] = useState('');


  // Handle form submission
  const handleAnimalSubmit = async (e) => {
    e.preventDefault(); //don't refresh the page

    // Check required fields
    if (!name || !animal_type || !sex || !description || !area_of_adoption || !color ||(images_and_videos.length == 0)) {
      setValidationError('Not all required fields are filled.');
      return;
    }
  
    const formData = new FormData();
  
    // Append fields to formData
    formData.append('name', name);
    formData.append('ageYears', ageYears);
    formData.append('ageMonths', ageMonths);
    formData.append('sex', sex);
    formData.append('animal_type', animal_type);
    formData.append('description', description);
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
      // Make the POST request to the server
      const response = await fetch('http://localhost:5000/api/animals/', {
        method: 'POST',
        body: formData,
      });
  
      // Check if the response is not OK
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error from server:', errorText);
        setError(errorText);
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
      const image = images_and_videos[0].name; //get profile image
      onSubmissionSuccess({ name, image, animal_id: animal.animal_id })  //changed status to submitted and pass param
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unable to submit the form. Please check your network or server.');
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

  // Cities for the form
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ country: "Israel" }), // Change the country to Israel
        });
  
        const result = await response.json();
        if (result && !result.error) {
          setCities(result.data); 
        } else {
          console.error('Error fetching cities:', result.msg);
        }
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
  
    fetchCities();
  }, []);

  return (
    <form className={styles.form} onSubmit={handleAnimalSubmit} noValidate>
      <h3 className={styles.title}>Add a New Animal!</h3>
      <div className={styles.field}>
        <label>Animal Name*</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Age</label>
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
        <label>Sex*</label>
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
        <label>Animal Type*</label>
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
        <label>Description*</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Area of Adoption*</label>
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
        <label>Color*</label>
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
        <label>Upload Images and Videos</label>
        <input
          type="file"
          multiple
          onChange={handleFiles}
          required
        />
      </div>
      {validationError && <div className={styles.validationError}>{validationError}</div>}
      <div className={styles.submitButton}>
      <button type="submit">Upload Animal</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default UploadAnimalForm;
