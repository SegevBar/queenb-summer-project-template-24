const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentSchema = new mongoose.Schema({
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
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  });
  
module.exports = mongoose.model('Content', contentSchema);