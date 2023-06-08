import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  GetHomeworldResponse,
  GetPeopleResponse,
  Person,
} from "@/types/starWarsApiTypes";

const BASE_URL = "https://swapi.dev/api";
const PATHS = {
  personById: (id: string) => `/people/${id}`,
  homeworldById: (id: string) => `/planets/${id}`,
  peopleByName: (search: string, page: number) =>
    `/people?search=${search}&page=${page}`,
};

type SearchPeopleByNameArg = {
  search: string;
  page: number;
};

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["StarWars"],
  endpoints: (builder) => ({
    getPersonById: builder.query<Person, string>({
      query: (id) => PATHS.personById(id),
      providesTags: (_, __, id) => [{ type: "StarWars", id: "PERSON_" + id }],
    }),
    getHomeworld: builder.query<GetHomeworldResponse, string>({
      query: (id) => PATHS.homeworldById(id),
      providesTags: (_, __, id) => [{ type: "StarWars", id: "PLANET_" + id }],
    }),
    searchPeopleByName: builder.query<GetPeopleResponse, SearchPeopleByNameArg>(
      {
        query: ({ search, page }) => PATHS.peopleByName(search, page),
        providesTags: (_, __, { search }) => [
          {
            type: "StarWars",
            id: "PARTIAL_LIST_" + search,
          },
        ],
      }
    ),
  }),
});
