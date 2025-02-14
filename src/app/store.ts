import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterReducer from "@features/filter/filterSlice";
import { filtersApi } from "@features/filter/filtersApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  filter: filterReducer,
  [filtersApi.reducerPath]: filtersApi.reducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(filtersApi.middleware),
    preloadedState
  });
}

const store = setupStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export default store;