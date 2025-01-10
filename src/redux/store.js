import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import postReducer from './slices/postSlice';
import commentReducer from './slices/commentSlice';
import allUsersReducer from './slices/allUsersSlice';
import logsReducer from './slices/logSlice';

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    blogPosts: postReducer,
    postComments: commentReducer,
    allUsers: allUsersReducer,
    logs: logsReducer
  },
});
