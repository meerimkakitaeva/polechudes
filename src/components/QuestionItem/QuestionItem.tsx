import React, { useState } from "react";
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
  const [showModal, setShowModal] = useState(false);

  const onDelete = async () => {
    await dispatch(deleteQuestion(item.id));
    await dispatch(fetchQuestions());
    setShowModal(false);
  };

  return (
    <div className="col-md-6 mb-4">
      <div className="card">
        <div className="card-body border-q">
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
            onClick={() => setShowModal(true)}
            disabled={deleteLoading ? deleteLoading === item.id : false}
          >
            Удалить
          </button>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Удаление</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Вы уверены, что хотите удалить этот вопрос?</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Отмена
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={onDelete}
                    disabled={deleteLoading ? deleteLoading === item.id : false}
                  >
                    {deleteLoading && deleteLoading === item.id ? (
                      <ButtonSpinner />
                    ) : (
                      "Удалить"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default QuestionItem;
