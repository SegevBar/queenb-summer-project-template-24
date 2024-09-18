const express = require('express')
const router = express.Router()

const { 
    createContent,
    deleteContent,
    updateContent,
    getAllContent,
    getRandomContent,
    getSingleContent,
    postContent,
 } = require('../controllers/contentController')

// GET all content
router.get('/', getAllContent)

//GET random content
router.get('/random', getRandomContent)

// GET a single content
router.get('/:id', getSingleContent)

// POST a new content item
router.post('/', createContent)

// POST a new content item
router.post('/new', postContent)

// UPDATE a content item
router.patch('/:id', updateContent) //or put??

// DELETE a content item
router.delete('/:id', deleteContent)


module.exports = router;