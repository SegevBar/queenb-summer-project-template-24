
import styles from "./AnimalItem.module.css";


const AnimalItem = ({ animals }) => {
    return (
      <div className="animal-item">
        <h1>{animals.name}</h1>
        {animals.images_and_videos[0] && (
          <img 
            src={`http://localhost:5000/uploads/${animals.images_and_videos[0]}`} 
            alt={animals.images_and_videos[0]}
            className={styles.image} 
          />
        )}
        {/* Details container with animal details and contact info */}
        <div className="animal-description">
            <h4>Description</h4>
            <p>{animals.description}</p>
            <hr className="description-line" />
        </div>
        <div className="details-container">
          <div className="animal-details">
            <h4>Animal Information</h4>
            <h5>Type: {animals.animal_type}</h5>
            <h5>Sex: {animals.sex}</h5>
            <h5>Age: {animals.age.years}.{animals.age.months}</h5>
            <h5>Color: {animals.color}</h5>
            <h5>Area: {animals.area_of_adoption}</h5>
          </div>
          <div className="contact-user">
            {animals.contact_user && (
              <>
                <h4>Contact Info</h4>
                <h5>Name: {animals.contact_user.name}</h5>
                <h5>Phone Number: {animals.contact_user.phone_number}</h5>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default AnimalItem;
  