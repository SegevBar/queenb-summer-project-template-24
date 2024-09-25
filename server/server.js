const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rubberDucksRoutes = require('./routes/rubberDucks')
const userRoutes = require('./routes/users')
const itemsRoutes = require('./routes/itemsRoutes');
const cors = require('cors');
app.use(cors());
app.use(express.json());

dotenv.config();

// Constants
const PORT = process.env.PORT;

// Create Express server
const app = express();

// Middleware
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/rubberDucks', rubberDucksRoutes)
app.use('/api/items', itemsRoutes)
app.use('/api/users', userRoutes)

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




