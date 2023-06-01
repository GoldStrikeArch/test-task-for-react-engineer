import { Person } from "@/types/starWarsApiTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type SearchState = {
  query: string;
  page: number;
  persons: Person[];
};

const initialState: SearchState = {
  query: "",
  page: 1,
  persons: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPersons: (state, action: PayloadAction<Person[]>) => {
      state.persons = action.payload;
    },
    updatePerson: (state, action: PayloadAction<Person>) => {
      state.persons = state.persons.map((person) =>
        person.url === action.payload.url ? action.payload : person
      );
    },
  },
});

export const {
  setSearch,
  setPersons,
  setPage,
  updatePerson,
} = searchSlice.actions;
export default searchSlice.reducer;
