import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { GetPeopleResponse, Person } from "@/types/starWarsApiTypes";

const BASE_URL = "https://swapi.dev/api";

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["StarWars"],
  endpoints: (builder) => ({
    getPersonById: builder.query<Person, string>({
      query: (id) => `/people/${id}`,
      providesTags: (_, __, id) => [{ type: "StarWars", id: "ITEM" + id }],
    }),
    searchPeopleByName: builder.query<
      GetPeopleResponse,
      { search: string; page: number }
    >({
      query: ({ search, page }) => `/people?search=${search}&page=${page}`,
      providesTags: (_, __, { search }) => [
        { type: "StarWars", id: "PARTIAL_LIST" + search },
      ],
    }),
  }),
});
