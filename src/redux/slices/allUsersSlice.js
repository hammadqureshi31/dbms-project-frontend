import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendPortURL } from "../../config";

export const fetchAllUsersDetails = createAsyncThunk(
  "allUsers/fetchAllUsersDetails",
  async () => {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${backendPortURL}user/allUsers`);
    return response.data;
  }
);

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllUsersDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        // console.log(action.payload);
      })
      .addCase(fetchAllUsersDetails.rejected, (state, action) => {
        console.error("Error:", action.error.message);
        state.isLoading = false;
        state.isError = true;
        state.data = null;
      });
  },
});


export default allUsersSlice.reducer;
