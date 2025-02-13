import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface FilterState {
  age: string | null;
  state: string | null;
  level: string | null;
  gender: string | null;
}

interface FilterPayload {
  key: keyof FilterState;
  value: string | null;
}

const initialState: FilterState = {
  age: null,
  state: null,
  level: null,
  gender: null,
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

export const selectFilter = (state: RootState, option: keyof FilterState) => state.filter[option];

export default filterSlice.reducer;
