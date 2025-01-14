import React from "react";
import { IQuestion } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { selectDeleteLoading } from "../../features/adminSlice";
import { deleteQuestion, fetchQuestions } from "../../features/gameThunk";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import { Link } from "react-router-dom";

interface Props {
  item: IQuestion;
}

const QuestionItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteLoading);

  const onDelete = async () => {
    if (window.confirm("Удалить этот вопрос?")) {
      await dispatch(deleteQuestion(item.id));
      await dispatch(fetchQuestions());
    }
  };

  return (
    <div className="col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Вопрос: {item.question}</h5>
          <p className="card-text">Ответ: {item.answer}</p>
          <Link
            className="btn btn-outline-success"
            to={"/admin/edit-question/" + item.id}
          >
            Изменить
          </Link>
          <button
            className="btn btn-outline-danger ms-2"
            onClick={onDelete}
            disabled={deleteLoading ? deleteLoading === item.id : false}
          >
            {deleteLoading && deleteLoading === item.id && <ButtonSpinner />}
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
