import { createContext, useState, useEffect } from 'react';

// Create the context for authentication
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  // Set up user state
  const [user, setUser] = useState(null);

  // This effect runs on component mount to check if a user is stored in localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser); // Restore the user if available
    }
  }, []);

  // Login function to save user and update context state
  const login = (userData) => {
    setUser(userData); // Set the user in state
    localStorage.setItem('user', JSON.stringify(userData)); // Persist the user to localStorage
  };

  // Logout function to clear user and update context state
  const logout = () => {
    setUser(null); // Clear the user from state
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  // Provide the state and actions to the components that consume this context
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
