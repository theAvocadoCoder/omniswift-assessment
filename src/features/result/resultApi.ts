import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResultMeta } from "./resultSlice";

export const resultApi = createApi({
  reducerPath: "resultApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://test.omniswift.com.ng/api/viewResult/" }),
  endpoints: (builder) => ({
    getResult: builder.mutation<ResultMeta, number>({
      query: (id) => ({
        url: id+"",
        method: "POST",
      }),
      transformResponse: (response: unknown & {data: ResultMeta}) => response.data || null,
    }),
  }),
});

export const { useGetResultMutation } = resultApi;
