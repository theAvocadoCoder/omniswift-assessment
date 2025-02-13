import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "@features/filter/filterSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;