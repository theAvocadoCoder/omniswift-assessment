import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { FilterState, selectActiveFilters } from "@features/filter/filterSlice";

export interface TableItem {
  id: number
  surname: string
  firstname: string
  age: number
  gender: string
  level: string
  state: string
}

export interface TableState {
  unfiltered: TableItem[]
  filtered: TableItem[]
}

const initialState: TableState = {
  unfiltered: [],
  filtered: [],
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    initializeTable: (state, action: PayloadAction<TableItem[]>) => {
      state.filtered = [...action.payload];
      state.unfiltered = [...action.payload];
    },
    populateTable: (state, action: PayloadAction<TableItem[]>) => {
      state.filtered = [...action.payload];
    },
  }
});

export const { initializeTable, populateTable } = tableSlice.actions;

export const selectStudentData = createSelector(
  (state: RootState) => state.table,
  selectActiveFilters,
  (table: RootState["table"], activeFilters: [keyof FilterState, string][]) => {
    return (
      activeFilters.length ?
      table.filtered :
      table.unfiltered
    )
  }
);

export default tableSlice.reducer;
