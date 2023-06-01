"use client";

import { Select } from "antd";
import Search from "antd/es/input/Search";
import { useEffect } from "react";
import { setPage, setSearch } from "@/store/searchSlice";

import useDebounce from "@/utils/hooks/useDebounce";
import PersonsPaginatedGrid from "./components/PersonsPaginationGrid";

import { useAppDispatch, useAppSelector } from "@/store";

const Filters = () => {
  return (
    <div>
      <Select />
    </div>
  );
};

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
      <Filters />
      <PersonsPaginatedGrid search={debouncedSearch} />
    </main>
  );
};
