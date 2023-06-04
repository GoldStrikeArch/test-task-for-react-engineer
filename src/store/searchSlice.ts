import { Person } from "@/types/starWarsApiTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Filters = {
  eye_color: "any" | "green" | "blue" | "brown" | "red" | "yellow";
  height: [number, number];
  mass: [number, number];
};
type SearchState = {
  query: string;
  page: number;
  filters: Filters;
  persons: Person[];
  count: number;
};

const initialState: SearchState = {
  query: "",
  page: 1,
  persons: [],
  count: 0,
  filters: {
    eye_color: "any",
    height: [0, Infinity],
    mass: [0, Infinity],
  },
};

const filterPersons = (filters: Filters) => (person: Person) => {
  console.log("from filterPersons", filters);
  const isCorrectEyeColor =
    filters.eye_color === "any" ? true : person.eye_color === filters.eye_color;

  const isCorrectMass =
    Number(person.mass) >= filters.mass[0] &&
    Number(person.mass) <= filters.mass[1];

  const isCorrectHeight =
    Number(person.height) >= filters.height[0] &&
    Number(person.height) <= filters.height[1];

  return isCorrectEyeColor && isCorrectMass && isCorrectHeight;
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
      const filterFn = filterPersons(state.filters);
      state.persons = action.payload.filter(filterFn);
    },
    updatePerson: (state, action: PayloadAction<Person>) => {
      state.persons = state.persons.map((person) =>
        person.url === action.payload.url ? action.payload : person
      );
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const {
  setSearch,
  setPersons,
  setPage,
  updatePerson,
  setFilters,
  setCount,
} = searchSlice.actions;
export default searchSlice.reducer;
