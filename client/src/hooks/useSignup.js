import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            // Await the JSON response
            const json = await response.json(); 
            console.log(json)

            // Check for response errors
            if (!response.ok) {
                setIsLoading(false);
                setError({type: json.type, message: json.error});
                return; // Exit the function
            }

            // Handle success
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });

        } catch (error) {
            setError({type: 'network_error', message:'Network error, please try again later.'});
        } finally {
            setIsLoading(false); // Ensure loading state is updated
        }
    }

    return { signup, isLoading, error };
}