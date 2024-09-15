const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Content = require('../models/ContentModel.js');

const app = express();
app.use(express.json());

// Set up Multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Add file type validation here if needed
    cb(null, true);
  }
});

// Submit route
app.post('/api/submit', upload.fields([
  { name: 'content', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      name,
      workout_type,
      duration,
      difficulty_level,
      description,
      tags,
      category
    } = req.body;

    // Validate required fields
    if (!name || !req.files['content']) {
      return res.status(400).json({ message: 'Name and content file are required' });
    }

    const newContent = new Content({
      name,
      url: req.files['content'][0].path,
      workout_type,
      duration,
      difficulty_level,
      thumbnail_url: req.files['thumbnail'] ? req.files['thumbnail'][0].path : undefined,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
      category
    });

    await newContent.save();

    res.status(201).json({ message: 'Content uploaded successfully', content: newContent });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});


const { 
    createContent,
 } = require('../controllers/contentController')

const router = express.Router()

// POST a new content item

router.post('/create', createContent);

module.exports = router;

