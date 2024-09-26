import React, { createContext, useEffect, useState } from "react";
import { fetchAttractions } from "../services/utils";
const AttractionContext = createContext();

const AttractionProvider = ({ children }) => {
  const [attractions, setAttractions] = useState([]);
  const [filterValuesAttractions, setFilterValuesAttractions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAttractions();
        setAttractions(data);
      } catch (error) {
        console.error("Error fetching attractions: ", error);
      }
    };
    fetchData();
  }, []);

  const getAttractions = () => {
    const res = attractions.filter((attraction) => {
      const {
        continents = [],
        categories = [],
        title = "",
      } = filterValuesAttractions;

      if (continents.length === 0 && categories.length === 0) {
        return attraction.title.toLowerCase().includes(title.toLowerCase());
      } else {
        return (
          (!continents.length || continents.includes(attraction.continent)) &&
          (!categories.length || categories.includes(attraction.category)) &&
          attraction.title.toLowerCase().includes(title.toLowerCase())
        );
      }
    });

    return res;
  };

  return (
    <AttractionContext.Provider
      value={{
        attractions,
        filterValuesAttractions,
        setFilterValuesAttractions,
        getAttractions,
      }}
    >
      {children}
    </AttractionContext.Provider>
  );
};
export { AttractionContext, AttractionProvider };
