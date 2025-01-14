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
    <>
      <form onSubmit={onFormSubmit} className="formQ">
        <div className="form-group">
          <div className="form-group mb-3">
            <label htmlFor="name">Создайте вопрос:</label>
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
          <label htmlFor="name">Создайте ответ:</label>
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
    </>
  );
};

export default QuestionForm;
