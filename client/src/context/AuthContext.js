import { createContext, useState, useEffect } from 'react';

// Create the context for authentication
const AuthContext = createContext();

// Create the provider component
const AuthProvider = ({ children }) => {
  // Set up user and token state
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  // This effect runs on component mount to check if a user and token are stored in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('authToken');

    // Only parse the user if it exists
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        // Optional: clear the corrupted data
        localStorage.removeItem('user');
      }
    }

    if (savedToken) {
      setAuthToken(savedToken);
    }
  }, []);

  // Login function to save user and update context state
  const login = (userData, token) => {
    setUser(userData);
    setAuthToken(token);

    // Save the user and token to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
  };

  // Signup function to save user and token
  const signup = (userData, token) => {
    setUser(userData);
    setAuthToken(token);

    // Save the user and token to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
  };

  // Logout function to clear user and token
  const logout = () => {
    setUser(null);
    setAuthToken(null);

    // Remove user and token from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  // Provide the state and actions to the components that consume this context
  return (
    <AuthContext.Provider value={{ user, authToken, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
