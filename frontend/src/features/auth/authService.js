import axios from "axios";

// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://backend-di886qi7u-mdasf.vercel.app";
const API_URL = `${BASE_URL}/api/users/`;

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
