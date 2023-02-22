import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    
  }
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ----------------------------------------------------------
// !Counter! 
// import counterReducer from "../components/counter/counterSlice";
// counter : counterReducer // this will be in the store.reducer
// ----------------------------------------------------------