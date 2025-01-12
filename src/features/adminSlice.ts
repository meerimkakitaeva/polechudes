import { createSlice } from "@reduxjs/toolkit";
import { IAdmin, IQuestion } from "../types";
import { adminLogin, questions } from "../constants";
import { RootState } from "../store";

interface AdminState {
  questions: IQuestion[];
  login: IAdmin;
  isLoggedIn: boolean;
}

const initialState: AdminState = {
  questions: questions,
  login: adminLogin,
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginCheck(state, action) {
      const { username, password } = action.payload;

      if (
        state.login.username === username &&
        state.login.password === password
      ) {
        state.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", "true");
      } else {
        state.isLoggedIn = false;
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export default adminSlice.reducer;
export const selectQuestions = (state: RootState) => state.admin.questions;
export const selectIsLoggedIn = (state: RootState) => state.admin.isLoggedIn;
export const { loginCheck, logout } = adminSlice.actions;
