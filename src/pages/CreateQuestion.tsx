import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { selectCreateLoading } from "../features/adminSlice";
import { IQMutation } from "../types";
import { createQuestion } from "../features/gameThunk";
import CreateQuestionForm from "../components/CreateQuestionForm/CreateQuestionForm";

const CreateQuestion = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectCreateLoading);

  const onSubmit = async (item: IQMutation) => {
    await dispatch(createQuestion(item));
    navigate("/admin");
  };

  return (
    <div className="mt-4">
      <CreateQuestionForm onSubmit={onSubmit} isLoading={loading} />
    </div>
  );
};

export default CreateQuestion;
