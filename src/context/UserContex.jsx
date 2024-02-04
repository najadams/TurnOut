import {
  setTokenInStorage,
  getTokenFromStorage,
  clearTokenFromStorage,
} from "../services/localStorageService";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../containers";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);



  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      const { token, user } = data;

      // Save the token in local storage
      setTokenInStorage(token);

      return user;
    } catch (error) {
      console.error("Error during login:", error.message);
      throw new Error("Login failed");
    }
  };

  const updateUserData = (updatedData) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedData }));
  };

  const logout = () => {
    setUser(null);
    clearTokenFromStorage();
  };

  // Effect to load user from local storage on component mount
  useEffect(() => {
    const storedToken = getTokenFromStorage();
    if (storedToken) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/user`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (!response.ok) {
            // Handle unauthorized or other errors
            console.error("Error fetching user details:", response.status);
            return;
          }

          const userData = await response.json();
          // Update user details in the context
          updateUserData(userData.user);
        } catch (error) {
          console.error("Error during user details fetch:", error.message);
        }
      };

      fetchUserDetails();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, updateUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};
