import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import filterReducer from "@features/filter/filterSlice";
import tableReducer from "@features/table/tableSlice";

import { filtersApi } from "@features/filter/filtersApi";
import { tableApi } from "@features/table/tableApi";

const rootReducer = combineReducers({
  filter: filterReducer,
  table: tableReducer,

  [filtersApi.reducerPath]: filtersApi.reducer,
  [tableApi.reducerPath]: tableApi.reducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
      .concat(filtersApi.middleware)
      .concat(tableApi.middleware),
    preloadedState
  });
}

const store = setupStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export default store;