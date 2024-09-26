import { useLocation } from "react-router-dom";
import styles from "./AttractionOverviewPage.module.css";
import Grid from "@mui/material/Grid2";

const AttractionOverviewPage = () => {
  const location = useLocation();
  const { attraction } = location.state || {};
  const {
    _id,
    title,
    city,
    imageUrl,
    description,
    recommendations,
    country,
    category,
  } = attraction;
  if (!attraction) {
    return <h1>No attraction data available</h1>;
  }

  return (
    <Grid container>
      <Grid size={5}>
        <img src={imageUrl} alt={title} className={styles.img} />
      </Grid>

      <Grid size={7}>
        <h2>{title}</h2>
        <h3>{city}</h3>
        <p>{description}</p>
        <p>Recommendations: {recommendations}</p>
        <p>Country: {country}</p>
        <p>Category: {category}</p>
      </Grid>
    </Grid>
  );
};

export default AttractionOverviewPage;
