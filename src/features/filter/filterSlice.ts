import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface FilterState {
  age: string;
  state: string;
  level: string;
  gender: string;
}

export interface FilterPayload {
  key: keyof FilterState;
  value: string;
}

const initialState: FilterState = {
  age: "",
  state: "",
  level: "",
  gender: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterPayload>) => {
      state[action.payload.key] = action.payload.value;
    }
  }
});

export const { setFilter } = filterSlice.actions;

export const selectActiveFilters = createSelector(
  (state: RootState) => state.filter,
  (filter: RootState["filter"]) => (Object.entries(filter) as [keyof FilterState, string][]).filter(f => !!f[1])
);

export default filterSlice.reducer;
