import { configureStore } from "@reduxjs/toolkit";
import postReducers from "../components/post/postSlice";
import userReducer from "../components/users/usersSlice";

export const store = configureStore({
  reducer: {
    post : postReducers,
    user : userReducer
  }
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ----------------------------------------------------------
// !Counter! 
// import counterReducer from "../components/counter/counterSlice";
// counter : counterReducer // this will be in the store.reducer
// ----------------------------------------------------------