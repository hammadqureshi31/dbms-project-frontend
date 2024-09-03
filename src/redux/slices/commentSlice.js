import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendPort } from "../../config";

export const fetchAllPostsComments = createAsyncThunk(
  "postComments/fetchAllPostsComments",
  async () => {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`${backendPort}/api/comment/`);
    return response.data;
  }
);

const commentSlice = createSlice({
  name: "postComments",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsComments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllPostsComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        // console.log("state ", action.payload);
      })
      .addCase(fetchAllPostsComments.rejected, (state, action) => {
        // console.error("Error:", action.error.message);
        state.isLoading = false;
        state.isError = true;
        state.data = null;
      });
  },
});


export default commentSlice.reducer;
