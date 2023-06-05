"use client";

import Search from "antd/es/input/Search";
import { useEffect } from "react";
import { setPage, setSearch } from "@/store/searchSlice";

import useDebounce from "@/utils/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/store";
import { FiltersSection } from "./components/FiltersSection";
import PersonsPaginatedGrid from "./components/PersonsPaginationGrid";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search.query);
  const debouncedSearch = useDebounce(search.toLowerCase().trim());

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
      <FiltersSection />
      <PersonsPaginatedGrid search={debouncedSearch} />
    </main>
  );
};
