import { Pagination, PaginationProps, Row, Skeleton } from "antd";
import { Fragment } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import { starWarsApi } from "@/store/starWarsApi";
import { CARD_WIDTH, DEFAULT_FILTERS } from "@/constants";
import { filterPersons, setPage } from "@/store/searchSlice";
import { LoadingSkeletons } from "@/app/components/HomePage/components/LoadingSkeletons";
import { PersonCard } from "@/app/components/HomePage/components/PersonCard";
import { equals } from "@/utils/functions/equals";
import { GetPeopleResponse, Person } from "@/types/starWarsApiTypes";
import EmptyContainer from "@/components/EmptyContainer";

type Props = {
  search: string;
};

export const PersonsPaginatedGrid = ({ search }: Props) => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.search.page);
  const filters = useAppSelector((state) => state.search.filters);
  const editedPersons = useAppSelector((state) => state.edit.editedPersons);

  const {
    data,
    isFetching,
    isLoading,
    error,
  } = starWarsApi.useSearchPeopleByNameQuery(
    { search, page },
    {
      selectFromResult: (res) => {
        if (equals(filters, DEFAULT_FILTERS)) return res;

        const filterFn = filterPersons(filters);
        const filtered = res.data?.results.filter(filterFn) as Person[];

        const data = {
          ...res.data,
          count: 10,
          results: filtered,
        } as GetPeopleResponse;

        return { ...res, data };
      },
    }
  );

  const handleChange: PaginationProps["onChange"] = (page) => {
    dispatch(setPage(page));
  };

  if (isLoading) {
    return (
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <LoadingSkeletons />
      </Row>
    );
  }

  if (error) {
    return <EmptyContainer title="Error, something went wrong" />;
  }

  if (!data?.results.length) {
    return <EmptyContainer title="No people :(" />;
  }

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {data!.results.map((person: Person) => {
          const editedPerson = editedPersons.find((p) => p.url === person.url);

          person = !editedPerson ? person : editedPerson;
          return isFetching ? (
            <div
              key={person.url + "skeleton"}
              style={{ width: CARD_WIDTH, marginLeft: "8px" }}
            >
              <Skeleton active />
              <Skeleton.Button active />
            </div>
          ) : (
            <PersonCard
              key={person.url}
              name={person.name}
              height={person.height}
              eye_color={person.eye_color}
              mass={person.mass}
              url={person.url}
            />
          );
        })}
      </Row>
      <Pagination
        style={{ marginTop: "16px" }}
        current={page}
        total={data.count}
        showSizeChanger={false}
        onChange={handleChange}
      />
    </>
  );
};
