import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Use Link to navigate back to the homepage
import SuccessScreen from './SuccessScreen'; // Import SuccessScreen component
import './RecipeForm.css'; // Import CSS for RecipeForm

const RecipeForm = () => {
  const [recipeData, setRecipeData] = useState({
    title: '',
    level: '',
    type: '',
    ingredients: '',
    instructions: '',
    tags: '',
    imageFile: null,
    videoLink: '',
  });

  const [uploadSuccess, setUploadSuccess] = useState(false); // Track if upload was successful
  const [errors, setErrors] = useState({}); // Track validation errors

  // Handle input field changes
  const handleChange = (e) => {
    setRecipeData({
      ...recipeData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setRecipeData({
      ...recipeData,
      imageFile: e.target.files[0], // Store the uploaded file in the state
    });
  };

  // Validate the form
  const validate = () => {
    const newErrors = {};
    if (!recipeData.title) newErrors.title = 'Title is required';
    if (!recipeData.level) newErrors.level = 'Level is required';
    if (!recipeData.type) newErrors.type = 'Type is required';
    if (!recipeData.ingredients) newErrors.ingredients = 'Ingredients are required';
    if (!recipeData.instructions) newErrors.instructions = 'Instructions are required';
    if (!recipeData.imageFile) newErrors.image = 'Image is required';
    if (!recipeData.tags) newErrors.tags = 'Tags are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (!validate()) {
      return; // If there are validation errors, do not submit the form
    }

    const formData = new FormData();
    formData.append('title', recipeData.title);
    formData.append('level', recipeData.level);
    formData.append('type', recipeData.type);
    formData.append('ingredients', recipeData.ingredients);
    formData.append('instructions', recipeData.instructions);
    formData.append('tags', recipeData.tags);
    formData.append('imageFile', recipeData.imageFile); // Append file to formData
    formData.append('videoLink', recipeData.videoLink);
    formData.append('publicationDate', new Date().toISOString()); // Current date
    formData.append('userName', 'someUser'); // Placeholder username

    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:5000/upload-recipe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setUploadSuccess(true); // Set success state to true on successful upload
      }
    } catch (error) {
      console.error('Error uploading recipe:', error);
    }
  };

  // If upload is successful, render the success screen
  if (uploadSuccess) {
    return <SuccessScreen />;
  }

  return (
    <div className="recipe-upload-container">
      <header className="header">
        <div className="title">Recipe Upload</div>
      </header>

      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="left-column">
          <div className="form-group">
            <label>Title*</label>
            <input
              type="text"
              name="title"
              value={recipeData.title}
              onChange={handleChange}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Level*</label>
            <select
              name="level"
              value={recipeData.level}
              onChange={handleChange}
            >
              <option value="" disabled hidden>Select a level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.level && <span className="error-message">{errors.level}</span>}
          </div>

          <div className="form-group">
            <label>Type*</label>
            <select
              name="type"
              value={recipeData.type}
              onChange={handleChange}
            >
              <option value="" disabled hidden>Select a type</option>
              <option value="starter">Starter</option>
              <option value="main">Main</option>
              <option value="dessert">Dessert</option>
            </select>
            {errors.type && <span className="error-message">{errors.type}</span>}
          </div>

          <div className="form-group">
            <label>Tags (comma-separated)*</label>
            <input
              type="text"
              name="tags"
              value={recipeData.tags}
              onChange={handleChange}
            />
            {errors.tags && <span className="error-message">{errors.tags}</span>}
          </div>
        </div>

        <div className="right-column">
          <div className="form-group">
            <label>Ingredients (comma-separated)*</label>
            <input
              type="text"
              name="ingredients"
              value={recipeData.ingredients}
              onChange={handleChange}
            />
            {errors.ingredients && <span className="error-message">{errors.ingredients}</span>}
          </div>

          <div className="form-group">
            <label>Instructions*</label>
            <textarea
              name="instructions"
              value={recipeData.instructions}
              onChange={handleChange}
            />
            {errors.instructions && <span className="error-message">{errors.instructions}</span>}
          </div>

          <div className="form-group">
            <label>Upload Image*</label>
            <input
              type="file"
              name="imageFile"
              onChange={handleFileChange}
            />
            {errors.image && <span className="error-message">{errors.image}</span>}
          </div>

          <div className="form-group">
            <label>Video URL (optional)</label>
            <input
              type="text"
              name="videoLink"
              value={recipeData.videoLink}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Button Group with Back and Submit buttons */}
        <div className="button-group">
          <Link to="/" className="back-btn">Back</Link> {/* Back button */}
          <button type="submit" className="submit-btn">Submit</button> {/* Submit button */}
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
