const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const animalRoutes = require('./routes/animalRoutes')
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const {MAX_FILE_SIZE} = require('./controllers/uploadAnimalController') 

dotenv.config();



// Constants
const PORT = process.env.PORT;

// Create Express server
const app = express();

app.use(express.static('server/AnimalUploadMedia'));
//app.use('/media', express.static(path.join(__dirname, 'server/AnimalUploadMedia')));


// הגדרת תיקיית קבצים סטטיים
app.use('/media', express.static(path.join(__dirname, 'server/AnimalUploadMedia')));

// שאר קוד השרת...


// Middleware
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL
}));


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// Routes
app.use('/api/animals', animalRoutes)
app.use('/api/user', userRoutes)
// Serve static files from the "AnimalUploadMedia" directory
app.use('/uploads', express.static(path.join(__dirname, 'AnimalUploadMedia')))

//get max file size for the client
app.get('/api/config', (req, res) => {
  res.json({ maxFileSize: MAX_FILE_SIZE });
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log('connected to mongoDB & listening on port', process.env.PORT)

    })
  }).catch((err) => {
    console.log(err)
  });

