import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendPortURL } from "../../config";

// Fetch user details
export const fetchLogDetails = createAsyncThunk("currentUser/fetchLogDetails", async () => {
  axios.defaults.withCredentials = true;
  const response = await axios.get(`${backendPortURL}api/logs/all`);
  return response.data; 
});

const logSlice = createSlice({
  name: "logs",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = false; 
      })
      .addCase(fetchLogDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchLogDetails.rejected, (state, action) => {
        console.error("Error:", action.error.message); 
        state.isLoading = false;
        state.isError = true;
        state.data = null
      });
  },
});

export default logSlice.reducer;
