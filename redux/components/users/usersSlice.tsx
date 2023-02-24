import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export  interface UserState {
  id : string;
  name : string;
}

const initialState : UserState[] = [
  { id: "1", name: "Jingalala" },
  { id: "2", name: "BauJi" },
  { id: "4", name: "Bhagwan"},
  { id: "5", name: "Chedi Singh"}
]

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state : RootState) => state.user;

export default userSlice.reducer;
