import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface GameState {
  question: string;
  answer: string[];
  guessedLetters: string[];
}

const initialState: GameState = {
  question: "",
  answer: [],
  guessedLetters: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setQuestion(state, action) {
      state.question = action.payload.question;
      state.answer = action.payload.answer.split("");
      state.guessedLetters = [];
    },
    guessLetter(state, action) {
      const letter = action.payload.toLowerCase();
      if (!state.guessedLetters.includes(letter)) {
        state.guessedLetters.push(letter);
      }
    },
    guessWord(state, action) {
      const guessedWord = action.payload.toLowerCase();
      if (guessedWord === state.answer.join("").toLowerCase()) {
        state.guessedLetters = state.answer.map((letter) =>
          letter.toLowerCase(),
        );
      }
    },
  },
});

export const { setQuestion, guessLetter, guessWord } = gameSlice.actions;
export default gameSlice.reducer;
export const selectGuessedLetters = (state: RootState) =>
  state.game.guessedLetters;
export const selectAnswer = (state: RootState) => state.game.answer;
export const selectQuestion = (state: RootState) => state.game.question;
