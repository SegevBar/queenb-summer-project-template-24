import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    workout_type: '',
    duration: '',
    difficulty_level: '',
    thumbnail_url: '',
    description: ''
  });
  
  // State to handle the video file
  const [videoFile, setVideoFile] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const data = new FormData();
    data.append('name', formData.name);
    data.append('url', formData.url);
    data.append('workout_type', formData.workout_type);
    data.append('duration', formData.duration);
    data.append('difficulty_level', formData.difficulty_level);
    data.append('thumbnail_url', formData.thumbnail_url);
    data.append('description', formData.description);

    // Append the video file
    if (videoFile) {
      data.append('video', videoFile);
    }

    try {
      // Replace '/api/content/upload' with your API endpoint
      const response = await axios.post('/api/content/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div>
      <h2>Upload New Video</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Video URL:</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Workout Type:</label>
          <input
            type="text"
            name="workout_type"
            value={formData.workout_type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Difficulty Level:</label>
          <select
            name="difficulty_level"
            value={formData.difficulty_level}
            onChange={handleChange}
          >
            <option value="">Select Difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Medium">Medium</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label>Thumbnail URL:</label>
          <input
            type="text"
            name="thumbnail_url"
            value={formData.thumbnail_url}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Video File:</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Upload Video</button>
      </form>
    </div>
  );
};

export default VideoUpload;
