const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllAnimals,
    getSingleAnimal,
    deleteAnimal,
    updateAnimal,
 } = require('../controllers/animalController')
 const {filterAndSortPets, } = require('../controllers/filteringAndSortingController') 
 const {createAnimal, upload, MAX_FILE_SIZE} = require('../controllers/uploadAnimalController') 


const router = express.Router()


/**
 * Read Only Permission Routes
 */
// GET filterd/sorted/both animals
router.get('/filterSort', filterAndSortPets)

// GET all animals
router.get('/', getAllAnimals)

// GET a single animal
router.get('/:id', getSingleAnimal)


/**
 * Read and Write Permission Routes
 */
// POST a new animal

router.post('/', (req, res, next) => {
    upload.array('images_and_videos', 10)(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: `File too large. Max size is ${(MAX_FILE_SIZE / (1024 * 1024)).toFixed(2)} MB.` });
          }
        } else {
          return res.status(400).json({ message: err.message });
        }
      }
  
      // Proceed with creating the animal if no errors
      createAnimal(req, res);
    });
  });


// DELETE a animal
router.delete('/:id', deleteAnimal)

// UPDATE a animal
router.patch('/:id', updateAnimal)

module.exports = router