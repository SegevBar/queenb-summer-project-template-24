require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors'); // Import CORS middleware
const Recipe = require('./models/Recipe');
const userRoutes = require('./routes/user'); // Import user routes
const app = express();

// Middleware to handle JSON requests
app.use(express.json());

// Enable CORS for all origins or use the specified client URL from environment variables
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests only from this origin
  credentials: true,               // Allow cookies if needed
}));

// Logging middleware to track incoming requests
app.use((req, res, next) => {
  console.log(req.path, req.method); // Log the request method and path
  next();
});

// MongoDB connection without deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up multer for file handling (uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
  }
});

const upload = multer({ storage: storage });

// Route to handle recipe upload
app.post('/upload-recipe', upload.single('imageFile'), async (req, res) => {
  console.log('Request received'); // Log when request reaches the server
  console.log(req.body); // Log the form data
  console.log(req.file); // Log the uploaded file details

  try {
    const { title, level, type, ingredients, instructions, tags, videoLink, publicationDate, userName } = req.body;

    // Create a new recipe with the data received
    const recipe = new Recipe({
      title,
      level,
      type,
      ingredients: ingredients.split(','), // Split comma-separated string into an array
      instructions,
      tags: tags.split(','), // Split comma-separated string into an array
      imageFile: req.file ? req.file.filename : null, // Save file name if uploaded
      videoLink,
      publicationDate,
      userName
    });

    // Save the recipe to the database
    await recipe.save();
    res.status(201).json({ message: 'Recipe uploaded successfully!' });
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Failed to upload recipe' });
  }
});

// User routes
app.use('/api/user', userRoutes); // Use user routes

// Use a dynamic port or fallback to port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
