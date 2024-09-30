const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
    animal_id:{
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
      years: {
          type: Number,
          min: 0,
          max: 100,
          default: 0
      },
      months: {
          type: Number,
          min: 0,
          max: 11,
          default: 0
      }
    },
    sex: {
      type: String,
      enum: ['Male', 'Female'],
      required: true
    },
    animal_type: {
      type: String,
      required: true
    },
    images_and_videos: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    contact_user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      /*required: true*/
    },
    area_of_adoption: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    get_along_with: {
      type: String,
    },
    breed: {
      type: String,
    },
    health_condition: {
      type: String,
    },
    spay_neuter: {
      type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Animal', AnimalSchema);