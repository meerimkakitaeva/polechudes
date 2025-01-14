import { createAsyncThunk } from "@reduxjs/toolkit";
import { IQList, IQuestion } from "../types";
import axiosApi from "../axiosApi";

export const fetchQuestions = createAsyncThunk<IQuestion[]>(
  "admin/fetchQuestions",
  async () => {
    const res = await axiosApi.get<IQList | null>("/questions.json");
    const qList = res.data;

    let newQ: IQuestion[] = [];
    if (qList) {
      newQ = Object.keys(qList).map((id) => {
        const question = qList[id];
        return {
          ...question,
          id,
        };
      });
    }
    return newQ;
  },
);

export const deleteQuestion = createAsyncThunk<void, string>(
  "admin/deleteQuestion",
  async (id) => {
    await axiosApi.delete(`/questions/${id}.json`);
  },
);
