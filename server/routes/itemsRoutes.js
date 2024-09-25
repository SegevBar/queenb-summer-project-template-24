const express = require('express');
const { getAllItems,
    getAllWomenItems,
    getAllMenItems,
    getSingleItem,
    createItem,
    deleteItem,
    updateItem,
 } = require('../controllers/itemController')

const router = express.Router()

const multer = require('multer');

/**
 * Read Only Permission Routes
 */
// GET all items
router.get('/', getAllItems)

// GET all women items
router.get('/women', getAllWomenItems);

// GET all men items
router.get('/men', getAllMenItems);

// GET a single item
router.get('/:id', getSingleItem)

/**
 * Read and Write Permission Routes
 */
// POST a new item

// הגדרת Multer לשמירת קבצים בתיקיית 'uploads'
/*
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });
  */
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
  
router.post('/', upload.single('image'), createItem);

//router.post('/', createItem)

// DELETE item
router.delete('/:id', deleteItem)

// UPDATE item
router.patch('/:id', updateItem)

module.exports = router