import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./CounterSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;