import React, { useState } from "react";
import { IQMutation } from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  onSubmit: (newQ: IQMutation) => void;
  isLoading?: boolean;
}

const initialState = {
  question: "",
  answer: "",
};

const CreateQuestionForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [newQ, setNewQ] = useState<IQMutation>(initialState);

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
          className="btn btn-primary mt-3"
          disabled={isLoading}
        >
          {isLoading && <ButtonSpinner />}
          Создать
        </button>
      </form>
    </>
  );
};

export default CreateQuestionForm;
