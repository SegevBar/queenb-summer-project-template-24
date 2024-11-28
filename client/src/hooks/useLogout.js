import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext(); // Use hook at the top level

    // Logout function that can be called in components
    const logout = () => {
        // Remove user from local storage
        localStorage.removeItem('user');
        
        // Dispatch logout action
        dispatch({ type: 'LOGOUT' });
    };

    return logout;
};