import { createContext, useState } from "react";

// Create a context for the user data
export const AuthContext = createContext();

// AuthProvider component to wrap our app and provide user data to other components
const AuthProvider = (props) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    userName: "",
    profilePic: "",
  });

  // update the state after a user is logged in
  const updateAuthState = async (userName, profilePic) => {
    setUser({
      isLoggedIn: true,
      userName: userName,
      profilePic: profilePic,
    });
  };

  return (
    <AuthContext.Provider value={{ user, updateAuthState }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
