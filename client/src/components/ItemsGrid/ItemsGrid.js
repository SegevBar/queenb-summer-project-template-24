import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ItemsGrid.module.css';
import FilterMenu from '../FilterMenu/FilterMenu';  
import { Link , useParams} from 'react-router-dom';
import SortingDropdown from '../SortingDropdown';


const ItemsGrid = () => {
  const { gender } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
  });

  console.log(gender) 
  
  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/items/${gender}`);
        const items = response.data.items || response.data;
        setData(Array.isArray(items) ? items : [items]);
        setFilteredData(items);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, [gender]);


    // Helper function to convert binary image to base64
    const arrayBufferToBase64 = (buffer) => {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    };


  const handleFilterChange = (filters) => {
    const { categories = [], gender = [], conditions = [], priceRange = [0, 500] ,sizes = []} = filters;
  
    const filteredData = data.filter((item) => {
      const categoryMatch = categories.length === 0 || categories.includes(item.category);
      const genderMatch = gender.length === 0 || gender.includes(item.gender);
      const conditionMatch = conditions.length === 0 || conditions.includes(item.condition);
      const sizeMatch = sizes.length === 0 || sizes.includes(item.size);

      const priceMatch = item.price >= priceRange[0] && item.price <= priceRange[1];

  
      return categoryMatch && genderMatch && conditionMatch && priceMatch && sizeMatch;
    });
  
    setFilteredData(filteredData);
  };

  const handleSortChange = (sortOption) => {
    console.log("Before sorting:", filteredData); 
    let sortedData = [...filteredData];
  
    if (sortOption === "lowToHigh") {
      sortedData.sort((a, b) => a.price - b.price); // Low to high price
    } else if (sortOption === "highToLow") {
      sortedData.sort((a, b) => b.price - a.price); // High to low price
    } else if (sortOption === "newToOld") {
      sortedData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // New to old
    } else if (sortOption === "oldToNew") {
      sortedData.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)); // Old to new
    }
    console.log("After sorting:", sortedData);
    setFilteredData(sortedData); // Set the sorted data
  };
  
  
  return (
    <div className={styles.itemsContainer}>
    <div className= {styles.sortingDropdown}>
      <SortingDropdown onSortChange={handleSortChange} />
    </div>
    <div>
    <FilterMenu onFilterChange={handleFilterChange} />
    {loading && <div className= {styles.loading}>Loading...</div>}
    {filteredData.length > 0 ? (
      <div className={styles.items}>
          {filteredData.map((item) => (   
            <div className={styles.cardContainer} key={item.id}>
              <Link to={`/items/${item.gender}/${item._id}`} className={styles.cardLink} key={item.id}> 
                 {item.image ? (
                  <img 
                    src={`data:image/jpeg;base64,${arrayBufferToBase64(item.image.data)}`}
                    className={styles.cardImg} key={item.imageUrl}
                    alt={item.name}
                  />
                ) : (
                  // If imageUrl exists, display the image from the URL
                  item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      className={styles.cardImg} key={item.imageUrl}
                      alt={item.name}
                    />
                  )
                )}
                <div className={styles.cardBody}>
                  <h5 className={styles.cardTitle} key={item.name}>{item.name}</h5>
                  <p className={styles.cardPrice} key={item.price}>{item.price}$</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : !loading && (
        <div className= {styles.noItems}>No items available</div>
      )}
    </div>
    </div>
  );
  
};

export default ItemsGrid;