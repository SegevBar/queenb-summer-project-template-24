const mongoose = require("mongoose");
const Attraction = require("../models/AttractionModel");

const addAttraction = async () => {
  try {
    // Create a new attraction document
    const newAttraction = new Attraction({
      _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId if not manually specified
      title: "Kai",
      city: "Bangkok",
      imageUrl:
        "https://lh3.googleusercontent.com/p/AF1QipMfaEyHlyrgMS3Rls3A7CeiiYd_FdiWbIeeZnxF=s1360-w1360-h1020",
      description: "amazing restaurant",
      recommendations: ["8/10"],
      category: "Restaurants",
      country: "New Zealand",
      continent: "Oceania",
    });

    // Save the document to the database
    await newAttraction.save();
    console.log("Attraction added successfully:", newAttraction);
  } catch (error) {
    console.error("Error adding attraction:", error);
  }
};

// Call the function to add the attraction
addAttraction();
