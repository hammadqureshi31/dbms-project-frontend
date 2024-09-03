import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendPortURL } from "../../config";

export const fetchAllPosts = createAsyncThunk(
  "blogPosts/fetchAllPosts",
  async () => {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${backendPortURL}api/post/`);
    return response.data;
  }
);

const postSlice = createSlice({
  name: "blogPosts",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        // console.log("state ",action.payload)
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        console.error("Error:", action.error.message);
        state.isLoading = false;
        state.isError = true;
        state.data = null;
      });
  },
});


export default postSlice.reducer;