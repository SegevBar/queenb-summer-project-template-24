const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    workout_type: {
      type: String,
      required: false
    },
    duration: {
      type: String, // or time?
      required: false
    },
    difficulty_level: {
      type: String,
      enum: ['Beginner', 'Medium', 'Advanced'],
      required: false
    },
    thumbnail_url: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
        
    },
    
  },{timestamps: true})
  
module.exports = mongoose.model('Content', contentSchema);