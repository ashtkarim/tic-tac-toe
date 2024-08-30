import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUserInfo] = useState(null);

    const setUser = (userData) => setUserInfo(userData);
  
    // // Function to log out a user
    // const logout = () => setUser(null);
  
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}
