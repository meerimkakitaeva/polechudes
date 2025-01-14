import React from "react";
import { IQuestion } from "../../types";

interface Props {
  item: IQuestion;
}

const QuestionItem: React.FC<Props> = ({ item }) => {
  return (
      <div className="col-md-6 mb-4">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Вопрос: {item.question}</h5>
                <p className="card-text">Ответ: {item.answer}</p>
                <a href="#" className="btn btn-success me-3">
                    Изменить
                </a>
                <a href="#" className="btn btn-danger">
                    Удалить
                </a>
            </div>
        </div>
      </div>
  );
};

export default QuestionItem;
