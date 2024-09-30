const express = require('express');
const { 
    createContent,
 } = require('../controllers/contentController')

const router = express.Router()

// POST a new content item

router.post('/create', createContent);

module.exports = router;