import api from './api';

export const fetchAttractions = async () => {
  try {
    const response = await api.get(`/attractions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching attractions:", error);
    throw error;
  }
};

export const fetchFilterValues = async () => {
  try {
      const [continentsResponse, categoriesResponse] = await Promise.all([
          api.get(`/attractions/unique/continent`),
          api.get(`/attractions/unique/category`)
      ]);

      return {
          continents: continentsResponse.data,
          categories: categoriesResponse.data
      };
  } catch (error) {
      console.error('Error fetching filter values:', error);
      throw error;
  }
};