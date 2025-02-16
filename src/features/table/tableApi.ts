import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TableItem } from "./tableSlice";
import { FilterState } from "@features/filter/filterSlice";

const endpoints = [
  "viewAllData",
  "filterData",
]

export const tableApi = createApi({
  reducerPath: "tableApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://test.omniswift.com.ng/api/" }),
  endpoints: (builder) => ({
    getStudentData: builder.query<TableItem[], void>({
      query: () => endpoints[0],
      transformResponse: (response: unknown & {data: {students: TableItem[]}}) => response.data.students,
    }),
    getFilteredData: builder.mutation<TableItem[], Partial<FilterState>>({
      query: (filter: FilterState) => ({
        url: endpoints[1],
        method: "POST",
        body: filter,
      }),
      transformResponse: (response: unknown & {data: {students: TableItem[]}}) => response.data?.students ?? [],
    }),
  }),
});

export const { useGetStudentDataQuery, useGetFilteredDataMutation } = tableApi;
