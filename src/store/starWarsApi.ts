import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { GetPeopleResponse, Person } from "@/types/starWarsApiTypes";
import { setCount, setPersons } from "./searchSlice";

const BASE_URL = "https://swapi.dev/api";
const PATHS = {
  personById: (id: string) => `/people/${id}`,
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
      providesTags: (_, __, id) => [{ type: "StarWars", id: "ITEM_" + id }],
    }),
    searchPeopleByName: builder.query<GetPeopleResponse, SearchPeopleByNameArg>(
      {
        query: ({ search, page }) => {
          console.log("from here");
          return PATHS.peopleByName(search, page);
        },
        async onCacheEntryAdded(
          _,
          { dispatch, cacheDataLoaded, getCacheEntry }
        ) {
          await cacheDataLoaded;

          dispatch(setPersons(getCacheEntry().data!.results));
          dispatch(setCount(getCacheEntry().data!.count));
        },
        providesTags: (_, __, { search }) => [
          { type: "StarWars", id: "PARTIAL_LIST_" + search },
        ],
      }
    ),
  }),
});
