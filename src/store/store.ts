// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter-slice";
import taskReducer from "../features/tasks/tasks-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tasks: taskReducer,
  },
});

// Type hỗ trợ cho TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
