import React, { useState } from "react";
import { IQMutation } from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  onSubmit: (newQ: IQMutation) => void;
  existingQ?: IQMutation;
  isEdit?: boolean;
  isLoading?: boolean;
}

const initialState = {
  question: "",
  answer: "",
};

const QuestionForm: React.FC<Props> = ({
  onSubmit,
  isLoading,
  isEdit,
  existingQ = initialState,
}) => {
  const [newQ, setNewQ] = useState<IQMutation>(existingQ);

  const inputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setNewQ((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...newQ,
    });
  };

  return (
    <div style={{ background: "#A8D0E6", height: "100vh" }}>
      <div className="text-white pt-3 pb-3" style={{ background: "#24305E" }}>
        <h4 className="formQ">{isEdit ? "Редактирование" : "Создание"}</h4>
      </div>
      <form onSubmit={onFormSubmit} className="formQ mt-3">
        <div className="form-group">
          <div className="form-group mb-3">
            <label htmlFor="name">Вопрос:</label>
            <textarea
              name="question"
              id="question"
              className="form-control"
              value={newQ.question}
              onChange={inputChange}
              required
            />
          </div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="name">Ответ:</label>
          <input
            type="text"
            name="answer"
            id="answer"
            className="form-control"
            value={newQ.answer}
            onChange={inputChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-success mt-3"
          disabled={isLoading}
        >
          {isLoading && <ButtonSpinner />}
          {isEdit ? "Сохранить" : "Создать"}
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
