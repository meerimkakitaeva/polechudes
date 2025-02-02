import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import {
  guessLetter,
  guessWord,
  selectAnswer,
  selectGuessedLetters,
  selectQuestion,
  setQuestion,
} from "../features/gameSlice";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { selectQuestions } from "../features/adminSlice";
import Card from "../components/Card/Card";
// @ts-ignore
import mainImage from "../assets/mainImage.jpg";
import { fetchQuestions } from "../features/gameThunk";
import Spinner from "../components/Spinner/Spinner";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const question = useAppSelector(selectQuestion);
  const answer = useAppSelector(selectAnswer);
  const guessedLetters = useAppSelector(selectGuessedLetters);
  const questions = useAppSelector(selectQuestions);
  const [word, setWord] = useState("");
  const [isWordGuessed, setIsWordGuessed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchQuestions()).finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (questions.length > 0) {
      const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
      dispatch(setQuestion(randomQuestion));
    }
  }, [questions, dispatch]);

  const letterCheck = (input: string) => {
    const letter = input.toLowerCase();
    if (letter.length === 1) {
      dispatch(guessLetter(letter));
    }
    const isWordGuessed = answer.every((letter) =>
      guessedLetters.includes(letter.toLowerCase()),
    );
    if (isWordGuessed) {
      handleWordGuessed();
    }
  };

  const wordCheck = () => {
    if (word.trim()) {
      const guessedWord = word.trim().toLowerCase();
      if (guessedWord === answer.join("").toLowerCase()) {
        handleWordGuessed();
      }
      dispatch(guessWord(guessedWord));
      setWord("");
    }
  };

  const handleWordGuessed = () => {
    setIsWordGuessed(true);
    setTimeout(() => {
      setIsWordGuessed(false);
      const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
      dispatch(setQuestion(randomQuestion));
    }, 5000);
  };

  return (
    <div className="main-bg text-center">
      {loading ? (
        <div className="position-absolute top-50 start-50 translate-middle">
          <Spinner />
        </div>
      ) : (
        <>
          {isWordGuessed && <Confetti />}
          <div className="container-lg mt-4">
            <h3 className="p-3">{question}</h3>
            <div className="d-flex flex-wrap justify-content-center mb-4">
              {answer.map((letter, index) => (
                <Card
                  key={index}
                  letter={
                    guessedLetters.includes(letter.toLowerCase()) ? letter : "_"
                  }
                />
              ))}
            </div>
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center mb-4 gap-3">
              <input
                type="text"
                maxLength={1}
                onChange={(e) => letterCheck(e.target.value)}
                className="form-control text-center w-auto"
                placeholder="Введите букву"
              />
              <div className="input-group w-auto">
                <input
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  className="form-control"
                  placeholder="Введите слово"
                />
                <button className="btn btn-primary" onClick={wordCheck}>
                  Проверить
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <img
              src={mainImage}
              className="main-image position-absolute bottom-0 end-0 mt-4"
              alt="yacubovich"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
