import { useAppDispatch, useAppSelector } from "@/store";
import { setFilters, setPersons } from "@/store/searchSlice";
import { starWarsApi } from "@/store/starWarsApi";
import { Select } from "antd";

const EYE_COLORS = ["any", "green", "blue", "brown", "red", "yellow"];

export const Filters = () => {
  const dispatch = useAppDispatch();
  const eyeColor = useAppSelector((state) => state.search.filters.eye_color);
  const mass = useAppSelector((state) => state.search.filters.mass);
  const height = useAppSelector((state) => state.search.filters.height);
  const search = useAppSelector((state) => state.search.query);
  const page = useAppSelector((state) => state.search.page);

  const { data } = starWarsApi.useSearchPeopleByNameQuery({ search, page });

  return (
    <div>
      <Select
        value={eyeColor}
        options={EYE_COLORS.map((x) => ({ value: x, label: x }))}
        onChange={(val) => {
          dispatch(setFilters({ eye_color: val, mass, height }));
          dispatch(setPersons(data!.results));
        }}
      />
    </div>
  );
};
