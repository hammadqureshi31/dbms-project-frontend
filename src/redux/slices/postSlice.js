import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendPortURL } from "../../config";

// Fetch all posts with pagination
export const fetchAllPosts = createAsyncThunk(
  "blogPosts/fetchAllPosts",
  async ({ page = 1, dashBoard = 0 }, { rejectWithValue }) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        `${backendPortURL}api/post/pages?page=${page}&dashBoard=${dashBoard}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch posts");
    }
  }
);

const postSlice = createSlice({
  name: "blogPosts",
  initialState: {
    isLoading: false,
    data: [], // Default to an empty array for posts
    isError: false,
    errorMessage: null, // To store error messages
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload; // Update with fetched posts
        console.log("Fetched Posts:", action.payload);
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "An error occurred";
        state.data = [];
        console.error("Fetch Error:", action.payload);
      });
  },
});

export default postSlice.reducer;
