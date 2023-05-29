import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Todo } from "./api/todos/route";
import type { GetPeopleResponse, Person } from "@/types/starWarsApiTypes";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/todos" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getAll: builder.query<Todo[], void>({
      query: () => "/",
      providesTags: [{ type: "Todos", id: "LIST" }],
    }),
    addTodo: builder.mutation<string, string>({
      query(text: string) {
        return {
          url: "/",
          method: "POST",
          body: {
            text,
          },
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query(todo) {
        return {
          url: `/${todo.id}`,
          method: "PUT",
          body: todo,
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    deleteTodo: builder.mutation<Todo, Todo>({
      query(todo) {
        return {
          url: `/${todo.id}`,
          method: "DELETE",
          body: todo,
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api" }),
  tagTypes: ["StarWars"],
  endpoints: (builder) => ({
    getPeople: builder.query<GetPeopleResponse, number | void>({
      query: (page = 1) => `/people?page=${page}`,
      providesTags: [{ type: "StarWars", id: "PARTIAL_LIST" }],
    }),
    getPersonById: builder.query<Person, string>({
      query: (id) => `/people/${id}`,
      providesTags: (_, __, id) => [{ type: "StarWars", id: "ITEM" + id }],
    }),
  }),
});
