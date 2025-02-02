import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { selectCreateLoading } from "../features/adminSlice";
import { IQMutation } from "../types";
import { createQuestion } from "../features/gameThunk";
import QuestionForm from "../components/QuestionForm/QuestionForm";

const CreateQuestion = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreateLoading);

  const onSubmit = async (item: IQMutation) => {
    await dispatch(createQuestion(item));
    navigate("/admin");
  };

  return <QuestionForm onSubmit={onSubmit} isLoading={loading} />;
};

export default CreateQuestion;
