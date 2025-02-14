import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FilterState } from "./filterSlice";

const endpoints = {
  ages: "viewAllAges",
  genders: "viewAllGender",
  levels: "viewAllLevels",
  states: "viewAllStates",
}

export interface Filters { 
  id: number,
  age?: string,
  gender?: string,
  level?: string,
  name?: string 
}

export const filtersApi = createApi({
  reducerPath: "filtersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://test.omniswift.com.ng/api/" }),
  endpoints: (builder) => ({
    getFilterOptions: builder.query<Filters[], keyof FilterState>({
      query: (option) => endpoints[`${option}s`],
      transformResponse: (response: unknown & {data: Filters[]}) => response.data,
    }),
  }),
});

export const { useGetFilterOptionsQuery } = filtersApi;
