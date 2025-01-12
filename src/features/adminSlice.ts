import { createSlice } from "@reduxjs/toolkit";
import { IQuestion } from "../types";
import { questions } from "../constants";
import { RootState } from "../store";

interface AdminState {
  questions: IQuestion[];
}

const initialState: AdminState = {
  questions: questions,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
});

export default adminSlice.reducer;
export const selectQuestions = (state: RootState) => state.admin.questions;
