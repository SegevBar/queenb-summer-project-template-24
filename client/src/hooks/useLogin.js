import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null); //true when we start the request
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        }); 

        const result = await response.json();

        if (!response.ok) {
            setError(result.error);
            setIsLoading(false);
        }

        if (response.ok) {
            setIsLoading(false);

            //save the user to local storage 
            localStorage.setItem('user', JSON.stringify(result)); //json web token and email
            
            dispatch( {type: 'LOGIN', payload: result } ); //update the auth context

            navigate('/');
        }
    }
    return { login, isLoading, error };
}