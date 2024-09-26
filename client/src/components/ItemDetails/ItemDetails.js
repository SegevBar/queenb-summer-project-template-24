import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ItemDetails.module.css';
import api from '../../services/api';
import FirstButton from '../common/FirstButton/FirstButton';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Item ID:", id); 

    const fetchItem = async () => {
      try {
        const response = await api.get(`/items/${id}`);
        if (response.status === 200) {
          setItem(response.data); 
        } else {
          console.error('Item not found');
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);


  return (
    <div className={styles.itemDetailContainer}>
      {loading && <div className={styles.loading}>Loading...</div>}
      {!item && !loading && <div className={styles.noItem}>Item doesn't exist</div>}
      { item && (
        <div className={styles.item}>
          {item.item.imageUrl && (
            <img src={item.item.imageUrl} alt={item.imageUrl || "Item Image"} className={styles.itemImg} />
          )}
          <div className={styles.itemDet}>
            <h2 className={styles.itemName}>{item.item.name}</h2>
            <p className={styles.itemGender}>{item.item.gender}</p> 
            <p className={styles.itemPrice}>{`${item.item.price}$`}</p>
            <p className={styles.itemSize}>Size: {item.item.size}</p>
            <p className={styles.itemCondition}>{item.item.condition}</p> 
            <p className={styles.item.itemDescription}>
            Description: {item.item.description || "No description available"}
            </p>
            <FirstButton className={styles.contactBtn}>Contact Seller</FirstButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemDetails;
