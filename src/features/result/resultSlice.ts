import { 
  createSelector, 
  createSlice, PayloadAction 
} from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface ResultMeta {
  id: number
  surname: string
  firstname: string
  age: number
  gender: string
  level: string
  state: string
  reg_no: string
  session: string
  result: ResultItem[]
  cummulative: CummulativeData
  logo: string
  profile_picture: string
}

export interface ResultItem {
  coursecode: string
  title: string
  credit_unit: number
  grade: string
  total_point: number
}

export interface CummulativeData {
  unts: number
  untd: number
  gpts: number
  gptd: number
  gpats: number
  gpatd: number
  remarks: string
}

export interface ResultState {
  meta: ResultMeta | null
}

const initialState: ResultState[] = []

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setCurrentResult: (state, action: PayloadAction<ResultMeta>) => {
      state[action.payload.id] = {...state[action.payload.id], meta: action.payload};
    },
  },
});

export const { setCurrentResult } = resultSlice.actions;

export const createSelectResultById = (id: number) => createSelector(
  (state: RootState) => state.result,
  (result: RootState["result"]) => result[id]?.meta,
);

export default resultSlice.reducer;
