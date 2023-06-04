import { DEFAULT_FILTERS } from "@/constants";
import { Person } from "@/types/starWarsApiTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Filters = {
  eye_color: "any" | "green" | "blue" | "brown" | "red" | "yellow";
  height: [number, number];
  mass: [number, number];
};
type SearchState = {
  query: string;
  page: number;
  filters: Filters;
};

const initialState: SearchState = {
  query: "",
  page: 1,
  filters: DEFAULT_FILTERS,
};

export const filterPersons = (filters: Filters) => (person: Person) => {
  if (!filters) return true;

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
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setSearch, setPage, setFilters } = searchSlice.actions;
export default searchSlice.reducer;
