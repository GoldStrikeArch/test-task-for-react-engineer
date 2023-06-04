"use client";

import Search from "antd/es/input/Search";
import { useEffect } from "react";
import { setPage, setSearch } from "@/store/searchSlice";

import useDebounce from "@/utils/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/store";
import { Filters } from "./components/Filters";
import PersonsPaginatedGrid from "./components/PersonsPaginationGrid";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search.query);
  const debouncedSearch = useDebounce(search.toLowerCase().trim());
  const data = useAppSelector((state) => state.search.persons);
  const filters = useAppSelector((state) => state.search.filters);

  useEffect(() => {
    if (debouncedSearch) {
      dispatch(setPage(1));
    }
  }, [debouncedSearch, dispatch, setPage]);

  return (
    <main>
      <Search
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <Filters />
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(filters, null, 2)}</pre>
      <PersonsPaginatedGrid search={debouncedSearch} />
    </main>
  );
};
