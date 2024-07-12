import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";

// Set authentication context to share and have access to the isAuthenicated state variable among components

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { user } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthenticatedUser = () => {
      user ? setIsAuthenticated(true) : setIsAuthenticated(false);
    };
    checkAuthenticatedUser();
  }, [user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
