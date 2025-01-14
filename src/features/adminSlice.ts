import { createSlice } from "@reduxjs/toolkit";
import { IAdmin, IQMutation, IQuestion } from "../types";
import { adminLogin } from "../constants";
import { RootState } from "../store";
import { createQuestion, deleteQuestion, fetchQuestions } from "./gameThunk";

interface AdminState {
  questions: IQuestion[];
  login: IAdmin;
  isLoggedIn: boolean;
  fetchLoading: boolean;
  deleteLoading: boolean | string;
  question: IQMutation | null;
  createLoading: boolean;
}

const initialState: AdminState = {
  questions: [],
  login: adminLogin,
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  fetchLoading: false,
  deleteLoading: false,
  question: null,
  createLoading: false,
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

    builder.addCase(deleteQuestion.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deleteQuestion.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteQuestion.rejected, (state) => {
      state.deleteLoading = true;
    });

    builder.addCase(createQuestion.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createQuestion.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createQuestion.rejected, (state) => {
      state.createLoading = true;
    });
  },
});

export default adminSlice.reducer;
export const selectQuestions = (state: RootState) => state.admin.questions;
export const selectIsLoggedIn = (state: RootState) => state.admin.isLoggedIn;
export const { loginCheck, logout } = adminSlice.actions;
export const selectFetchLoading = (state: RootState) =>
  state.admin.fetchLoading;
export const selectDeleteLoading = (state: RootState) =>
  state.admin.deleteLoading;
export const selectCreateLoading = (state: RootState) =>
  state.admin.createLoading;
