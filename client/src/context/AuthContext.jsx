import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextValue";
import { userAPI } from "../services/api";

export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [token, setToken] = useState(null);
      const [loading, setLoading] = useState(true);
      const [isAdmin, setIsAdmin] = useState(false);

      // Initialize from localStorage
      useEffect(() => {
            const storedToken = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (storedToken && storedUser) {
                  try {
                        const userData = JSON.parse(storedUser);
                        setToken(storedToken);
                        setUser(userData);
                        setIsAdmin(userData.role === "admin");
                  } catch (error) {
                        console.error("Error loading auth state:", error);
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                  }
            }
            setLoading(false);
      }, []);

      const login = async (email, password) => {
            try {
                  const response = await userAPI.login({ email, password });
                  const { user: userData, token: newToken } = response.data.data;

                  setUser(userData);
                  setToken(newToken);
                  setIsAdmin(userData.role === "admin");

                  localStorage.setItem("token", newToken);
                  localStorage.setItem("user", JSON.stringify(userData));

                  return { success: true, message: "Login successful" };
            } catch (error) {
                  const message = error.response?.data?.message || "Login failed";
                  return { success: false, message };
            }
      };

      const logout = () => {
            setUser(null);
            setToken(null);
            setIsAdmin(false);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
      };

      const updateProfile = async (data) => {
            try {
                  const response = await userAPI.updateProfile(data);
                  const updatedUser = response.data.data.user;
                  setUser(updatedUser);
                  localStorage.setItem("user", JSON.stringify(updatedUser));
                  return { success: true, message: "Profile updated successfully" };
            } catch (error) {
                  const message = error.response?.data?.message || "Profile update failed";
                  return { success: false, message };
            }
      };

      const changePassword = async (oldPassword, newPassword, confirmPassword) => {
            try {
                  await userAPI.changePassword({ oldPassword, newPassword, confirmPassword });
                  return { success: true, message: "Password changed successfully" };
            } catch (error) {
                  const message = error.response?.data?.message || "Password change failed";
                  return { success: false, message };
            }
      };

      const value = {
            user,
            token,
            loading,
            isAdmin,
            isAuthenticated: !!token,
            login,
            logout,
            updateProfile,
            changePassword,
      };

      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
