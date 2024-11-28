import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    
    // if we try to use the error outside its scope, we throw an error
    if (!context) { 
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}