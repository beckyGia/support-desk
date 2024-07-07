import axios from "axios"; // Importing axios, which helps us make requests to a server.

const REGISTER_URL = "/api/users"; // This is the URL we use to talk to the server about users.
const LOGIN_URL = "/api/users/login"; // This is the URL we use to talk to the server about users.

// Register User
const register = async (userData) => {
  // We use axios to send the user's data to the server.
  const response = await axios.post(REGISTER_URL, userData);

  // If the server gives us some data back...
  if (response.data) {
    // We save it in the local storage (like saving a game progress).
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  // We return the data we got from the server.
  return response.data;
};

// Login User
const login = async (userData) => {
  // We use axios to send the user's data to the server.
  const response = await axios.post(LOGIN_URL, userData);

  // If the server gives us some data back...
  if (response.data) {
    // We save it in the local storage (like saving a game progress).
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  // We return the data we got from the server.
  return response.data;
};

// Logout User
const logout = () => localStorage.removeItem("user");

// We put our register function inside an object called authService.
const authService = {
  register,
  logout,
  login,
};

// We export authService so we can use it in other parts of our app.
export default authService;
