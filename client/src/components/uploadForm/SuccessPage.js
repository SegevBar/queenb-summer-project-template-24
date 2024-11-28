
import React, { useEffect } from 'react';
import styles from './uploadForm.css';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const { item } = location.state || {};


    // Log the location.state to see if the item is passed correctly
    useEffect(() => {
        console.log('Location state:', location.state);
    }, [location.state]);

    return (
        <div className='center-wrapper'>
            <div className='creatSuccess'>
                {item ?(
                <h1 className='headlineSuccess '>Your {item.name} is Now Online!</h1>
                ) : (
                    <h1> Your Item is Now Online!</h1>
                )}
            </div>
        </div>
    );
};

export default SuccessPage;