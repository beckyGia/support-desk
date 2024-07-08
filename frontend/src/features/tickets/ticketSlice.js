import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
  tickets: [], //multiple tickets
  ticket: {}, //single ticket
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Ticket
export const createTicket = createAsyncThunk(
  "tickets/create", // This is the name of our special function.
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.createTicket(ticketData, token);
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

// Get User Tickets
export const getTickets = createAsyncThunk(
  "tickets/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTickets(token);
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

// Get Single Ticket
export const getTicket = createAsyncThunk(
  "tickets/get",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTicket(ticketId, token);
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

// Close Single Ticket
export const closeTicket = createAsyncThunk(
  // "tickets/close" is like a name tag for this special action.
  "tickets/close",

  // This part is an async function that takes two things: ticketId and thunkAPI
  async (ticketId, thunkAPI) => {
    try {
      // We are trying to get the user's token from the state using thunkAPI.
      const token = thunkAPI.getState().auth.user.token;

      // We use the ticketService to close the ticket using ticketId and token.
      return await ticketService.closeTicket(ticketId, token);
    } catch (error) {
      // If something goes wrong, we catch the error and create a message.
      const message =
        (error.response && // If there's a response from the server...
          error.response.data && // and it has some data...
          error.response.data.message) || // we use that message.
        error.message || // Otherwise, we use the general error message.
        error.toString(); // If all else fails, we convert the error to a string.

      // Then we send the error message back.
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = "Closed")
            : ticket
        ); // This essentially changes the status in the frontend so we do not need to refresh the page, when we are redirected back to the tickets page
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
