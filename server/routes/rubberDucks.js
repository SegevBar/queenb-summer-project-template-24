const express = require('express');
const { createDuck,
    getAllDucks,
    getSingleDuck,
    deleteDuck,
    updateDuck,
    getRandomDuck,
 } = require('../controllers/rubberDuckController')

 //require the middleware
const requireAuth = require('../middleware/requireAuth')

 const router = express.Router()

 router.use(requireAuth)

/**
 * Read Only Permission Routes
 */
// GET all ducks
router.get('/', getAllDucks)

// GET a random duck
router.get('/random', getRandomDuck);

// GET a single duck
router.get('/:id', getSingleDuck)

/**
 * Read and Write Permission Routes
 */
// POST a new duck
router.post('/', createDuck)

// DELETE a duck
router.delete('/:id', deleteDuck)

// UPDATE a duck
router.patch('/:id', updateDuck)

module.exports = router