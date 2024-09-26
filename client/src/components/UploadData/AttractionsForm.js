import { useState } from "react";
import "./AttractionsForm.css";
import axiosInstance from "../../services/api";

const AttractionForm = () => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [error, setError] = useState(null);

  const handleReset = () => {
    setTitle("");
    setCity("");
    setImageUrl("");
    setDescription("");
    setRecommendations("");
    setCategory("");
    setCountry("");
    setContinent("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const attraction = {
      title,
      city,
      imageUrl,
      description,
      recommendations,
      category,
      country,
      continent,
    };

    console.log(attraction);

    try {
      const response = await axiosInstance.post(
        "/attractions/create",
        attraction
      );

      const res = response.data;

      handleReset();
      setError(null);
      console.log("new attraction added", res);
    } catch (error) {
      console.error("Error adding attraction:", error);
      setError("Failed to add attraction");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3>Add a new attraction</h3>
        <label>Attraction Title:</label>
        <input
          type="text"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          placeholder="Enter title"
          required
        />

        <label>Attraction city:</label>
        <input
          type="text"
          onChange={(event) => setCity(event.target.value)}
          value={city}
          placeholder="Enter city"
          required
        />

        <label>Attraction image (enter a link url to the chosen image):</label>
        <input
          type="text"
          onChange={(event) => setImageUrl(event.target.value)}
          value={imageUrl}
          placeholder="Enter URL image"
          required
        />

        <label>Attraction description:</label>
        <textarea
          cols="65"
          rows="10"
          placeholder="enter description"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          required
        />

        <label>
          Attraction recommendations (enter a number between 1 to 10):
        </label>
        <input
          type="number"
          onChange={(event) => setRecommendations(event.target.value)}
          value={recommendations}
          placeholder="Enter your rating, where 10 represents the best attraction and 1 the worst"
          required
        />
        <label>Attraction category:</label>
        <input
          type="text"
          onChange={(event) => setCategory(event.target.value)}
          value={category}
          placeholder="Enter category"
          required
        />

        <label>Attraction country:</label>
        <input
          type="text"
          onChange={(event) => setCountry(event.target.value)}
          value={country}
          placeholder="Enter country"
          required
        />

        <label>Attraction continent:</label>
        <input
          type="text"
          onChange={(event) => setContinent(event.target.value)}
          value={continent}
          placeholder="Enter continent"
          //   required
        />
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <button type="submit">Add Attraction</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default AttractionForm;
