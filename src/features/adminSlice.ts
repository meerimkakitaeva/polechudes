import { createSlice } from "@reduxjs/toolkit";
import { IAdmin, IQuestion } from "../types";
import { adminLogin } from "../constants";
import { RootState } from "../store";
import { fetchQuestions } from "./gameThunk";

interface AdminState {
  questions: IQuestion[];
  login: IAdmin;
  isLoggedIn: boolean;
  fetchLoading: boolean;
}

const initialState: AdminState = {
  questions: [],
  login: adminLogin,
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  fetchLoading: false,
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
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
      state.fetchLoading = false;
    });
    builder.addCase(fetchQuestions.rejected, (state) => {
      state.fetchLoading = true;
    });
  },
});

export default adminSlice.reducer;
export const selectQuestions = (state: RootState) => state.admin.questions;
export const selectIsLoggedIn = (state: RootState) => state.admin.isLoggedIn;
export const { loginCheck, logout } = adminSlice.actions;
