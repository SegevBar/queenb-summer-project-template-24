import React, { useState } from "react";
import styles from "./FilteringCom.module.css";
import Slider from 'rc-slider';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import 'rc-slider/assets/index.css'; // Import default styles for rc-slider

//third working
const tagOptions = {
  Gender: ["Male", "Female"],
  AnimalType: ["Dog", "Cat", "Rabbit"],
  Breed: ["Labrador", "Beagle", "Persian"],
  Color: ["Black", "White", "Brown"],
  City: ["Tel Aviv", "Haifa", "Jerusalem"],
};

const FilterModal = ({ isOpen, onClose }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [ageRange, setAgeRange] = useState([0, 20]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const tags = ["Gender", "AnimalType", "Breed", "Color", "City"];

  const handleAgeChange = (value) => {
    setAgeRange(value);
  };

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const toggleOptions = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setSelectedOption(null);
    } else {
      setSelectedTag(tag);
      setSelectedOption(null);
    }
  };

  const handleFilter = () => {
    console.log("Selected tags: ", selectedTags);
    console.log("Selected options: ", selectedOption);
    console.log("Age Range: ", ageRange);
    onClose();
  };

  // Only render the modal if isOpen is true
  if (!isOpen) return null;

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <h2>Filter by</h2>

        {/* Age Range Slider */}
         <div className={styles["slider-container"]}>
           <label>Age Range: {ageRange[0]} - {ageRange[1]}</label>
           <Slider
            range
            min={0}
            max={20}
            value={ageRange}
            onChange={handleAgeChange}
            className={styles.slider} // Add custom slider class from CSS
          />
        </div>

        <div className={styles["tag-container"]}>
          {tags.map((tag, index) => (
            <div key={index}>
              <button
                className={`${styles["tag-btn"]} ${selectedTags.includes(tag) ? styles["selected"] : ""}`}
                onClick={() => {
                  toggleTag(tag);
                  toggleOptions(tag);
                }}
              >
                {tag}
              </button>
              {selectedTag === tag && (
                <div className={styles["options-container"]}>
                  {tagOptions[tag].map((option) => (
                    <button
                      key={option}
                      className={`${styles["option-btn"]} ${selectedOption === option ? styles["selected"] : ""}`}
                      onClick={() => setSelectedOption(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles["modal-actions"]}>
          <button className={styles["cancel-btn"]} onClick={onClose}>Cancel</button>
          <button className={styles["filter-btn"]} onClick={handleFilter}>Filter</button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;




//second working
// const FilterModal = ({ isOpen, onClose }) => {
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [ageRange, setAgeRange] = useState([0, 20]);

//   const tags = ["sex", "animal_type", "breed", "color", "area_of_adoption"];

//   const toggleTag = (tag) => {
//     setSelectedTags((prevTags) =>
//       prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
//     );
//   };

//   const handleFilter = () => {
//     console.log("Selected tags: ", selectedTags);
//     console.log("Age Range: ", ageRange);
//     onClose();
//   };

//   const handleAgeChange = (value) => {
//     setAgeRange(value);
//   };

//   // Only render the modal if isOpen is true
//   if (!isOpen) return null;

//   return (
//     <div className={styles["modal-overlay"]}>
//       <div className={styles["modal-content"]}>
//         <h2>Filter by</h2>

//         {/* Age Range Slider */}
//         <div className={styles["slider-container"]}>
//           <label>Age Range: {ageRange[0]} - {ageRange[1]}</label>
//           <Slider
//             range
//             min={0}
//             max={20}
//             value={ageRange}
//             onChange={handleAgeChange}
//             className={styles.slider} // Add custom slider class from CSS
//           />
//         </div>

//         <div className={styles["tag-container"]}>
//           {tags.map((tag, index) => (
//             <button
//               key={index}
//               className={`${styles["tag-btn"]} ${selectedTags.includes(tag) ? styles["selected"] : ""}`}
//               onClick={() => toggleTag(tag)}
//             >
//               {tag}
//             </button>
//           ))}
//         </div>

//         <div className={styles["modal-actions"]}>
//           <button className={styles["cancel-btn"]} onClick={onClose}>Cancel</button>
//           <button className={styles["filter-btn"]} onClick={handleFilter}>Filter</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterModal;


