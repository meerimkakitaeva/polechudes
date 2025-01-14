import { createAsyncThunk } from "@reduxjs/toolkit";
import { IQList, IQMutation, IQuestion } from "../types";
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

export const createQuestion = createAsyncThunk<void, IQMutation>(
  "admin/createQuestion",
  async (question) => {
    await axiosApi.post("/questions.json", question);
  },
);

export const fetchOneQuestion = createAsyncThunk<IQuestion, string>(
  "admin/fetchOneQ",
  async (id) => {
    const res = await axiosApi.get<IQuestion | null>(
      "/questions/" + id + ".json",
    );
    const question = res.data;
    if (question === null) {
      throw new Error("Not found!");
    }
    return question;
  },
);

interface editParams {
  id: string;
  question: IQMutation;
}

export const editQuestion = createAsyncThunk<void, editParams>(
  "admin/editQ",
  async (params) => {
    await axiosApi.put(`/questions/${params.id}.json`, params.question);
  },
);
