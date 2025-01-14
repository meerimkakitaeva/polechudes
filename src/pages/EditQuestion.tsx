import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { selectQuestion } from "../features/adminSlice";
import {
  selectEditLoading,
  selectFetchOneQLoading,
} from "../features/adminSlice";
import { editQuestion, fetchOneQuestion } from "../features/gameThunk";
import { IQMutation } from "../types";
import Spinner from "../components/Spinner/Spinner";
import QuestionForm from "../components/QuestionForm/QuestionForm";

const EditCategory = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const question = useAppSelector(selectQuestion);
  const editLoading = useAppSelector(selectEditLoading);
  const oneLoading = useAppSelector(selectFetchOneQLoading);

  const onSubmit = async (question: IQMutation) => {
    await dispatch(editQuestion({ id, question }));
    navigate("/admin");
  };

  useEffect(() => {
    dispatch(fetchOneQuestion(id!));
  }, [dispatch]);

  return (
    <div>
      {oneLoading ? (
        <Spinner />
      ) : (
        question && (
          <QuestionForm
            onSubmit={onSubmit}
            existingQ={question}
            isLoading={editLoading}
            isEdit={true}
          />
        )
      )}
    </div>
  );
};

export default EditCategory;
