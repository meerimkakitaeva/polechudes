import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./features/gameSlice";
import adminReducer from "./features/adminSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
