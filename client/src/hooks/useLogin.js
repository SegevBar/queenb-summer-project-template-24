import { useState } from "react";
import {useAuthContext} from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null) // This is going to be True when we start the request (allows to present a visual loading state on the button, for instance)
    const {dispatch} = useAuthContext() // will be used to update auth context

    // We create an async function for loggin users in. This is pretty much the same as the signup hook in useSignup.js
    const login = async (email,password) => {
        setIsLoading(true)
        setError(null)

        try{
            const response = await fetch('http://localhost:5000/api/users/login',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email,password })
            });

            const json = await response.json() // if success - this returns some information with the json web token; if it wasn't a success, this is going to return an error
            console.log(json)
    
            if (!response.ok){ // read as: if it's not okay, if we have a problem:
                setIsLoading(false) // because now we're not loading
                setError({type: json.type, message: json.error}) // there is a problem, we raise an error
                return;
            }

            // The following saves the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            // The following updates auth context
            dispatch({type: 'LOGIN', payload: json})
             
        } catch (error) {
            setError({type: 'network_error', message:'Network error, please try again later.'});
        } finally {
            setIsLoading(false);
        }
    }    
    
    return {login, isLoading, error}
}