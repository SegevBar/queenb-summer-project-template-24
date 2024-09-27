const Animal = require('../models/AnimalModel');
const multer = require('multer');
const path = require('path');

let animalIdCounter = 0;

//initialize id counter
const InitializeAnimalIdCounter = async () => {

  try {
    // Find the latest animal by sorting animal_id in descending order
    const lastAnimal = await Animal.findOne().sort({ animal_id: -1 }).exec();
    
    // If no animal is found, return 0 (first entry)
    if (!lastAnimal) {
      return 0;
    }
    
    return lastAnimal.animal_id;

  } catch (err) {
    console.error('Error fetching last animal ID:', err);
    throw new Error('Failed to fetch last animal ID');
  }
};

//initialize counter from DB before the first post req
(async () => {
  animalIdCounter = await InitializeAnimalIdCounter();
})();


//saving animal media to AnimalUploadMedia folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'AnimalUploadMedia/'); 
  },
  filename: async (req, file, cb) => {
    try {
      // Increment animal ID for new animal
      if (!req.animal_id) {
        req.animal_id = ++animalIdCounter;
      }

      // Create a new filename with the animal_id prefix
      const newFilename = `${req.animal_id}_${file.originalname}`;
      cb(null, newFilename);
    } catch (err) {
      cb(err);
    }
  }
});
const upload = multer({ storage: storage });


//create the animal for the post req
const createAnimal = async (req, res) => {
  // Extract fields from the request body
  const {
    name,
    ageYears,
    ageMonths,
    sex,
    animal_type,
    description,
    area_of_adoption,
    color,
    get_along_with,
    breed,
    health_condition,
    spay_neuter
  } = req.body;

  // Use animal ID set by multer's filename function
  const animal_id = req.animal_id;

  // Access uploaded files from multer, filenames already include animal_id
  const images_and_videos = req.files.map(file => file.filename);
  
  try {
    // Create a new animal
    const animal = await Animal.create({
      // required fields
      animal_id,
      name,
      age: {
        years: parseInt(ageYears, 10) || 0, // Default to 0
        months: parseInt(ageMonths, 10) || 0 // Default to 0
      },
      sex,
      animal_type,
      images_and_videos, 
      description,
      area_of_adoption,
      color,
      // Default to empty string - non required filed
      get_along_with: get_along_with || '', 
      breed: breed || '', 
      health_condition: health_condition || '', 
      spay_neuter: spay_neuter || '' 
    });

    // Respond with the newly created animal
    res.status(201).json({ animal });
  } catch (err) {
    // Handle creation error
    console.error('Error creating animal:', err);
    res.status(400).json({ message: 'Error creating animal', error: err.message });
  }
};


module.exports = {
  createAnimal,
  upload,
};
