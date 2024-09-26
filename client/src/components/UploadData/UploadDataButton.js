import * as React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styles from "../Attractions/FilterAttractions/FilterAttractions.module.css"; // A
import { useNavigate } from "react-router-dom";

const UploadDataButton = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.filtersContainer}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        onClick={() => {
          navigate("/upload");
        }}
      >
        Upload data
      </Button>
    </div>
  );
};

export default UploadDataButton;
