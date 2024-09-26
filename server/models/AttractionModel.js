const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attractionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    recommendations: {
      type: Array,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    continent: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attraction", attractionSchema);
