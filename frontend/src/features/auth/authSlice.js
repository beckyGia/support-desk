import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Get User from LocalStorage
const user = JSON.parse(localStorage.getItem("user"));

// This is the initial state, like the starting conditions for our game.
const initialState = {
  user: user ? user : null, // No user is logged in at the start.
  isError: false, // No errors at the start.
  isSuccess: false, // No success message at the start.
  isLoading: false, // Not loading anything at the start.
  message: "", // No messages at the start.
};

// Register User
export const register = createAsyncThunk(
  "auth/register", // This is the name of our special function.
  async (user, thunkAPI) => {
    try {
      // We try to register the user.
      return await authService.register(user);
    } catch (error) {
      // If something goes wrong, we catch the error and create a message.
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // Then we send the error message back.
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login User
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    // We try to register the user.
    return await authService.login(user);
  } catch (error) {
    // If something goes wrong, we catch the error and create a message.
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    // Then we send the error message back.
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout User
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// This is like a slice of our big state pie, focused on "auth" (authentication).
export const authSlice = createSlice({
  name: "auth", // This is the name of the slice, "auth" for authentication.
  initialState, // This is our starting state.
  reducers: {
    // These are basic actions we can do.
    reset: (state) => {
      // This resets our state to its initial values.
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // These are extra actions for more complex stuff.
    builder
      .addCase(register.pending, (state) => {
        // When we're waiting for the registration to finish, we set loading to true.
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        // When the registration is done successfully, we set success to true and add the user data.
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        // If the registration fails, we show an error message and reset the user data.
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        // When we're waiting for the login to finish, we set loading to true.
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // When the login is done successfully, we set success to true and add the user data.
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        // If the login fails, we show an error message and reset the user data.
        state.isLoading = false;
        state.user = null;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// We export our slice reducer so it can be used in the store.
export default authSlice.reducer;
export const { reset } = authSlice.actions;
