import { Pagination, PaginationProps, Row, Skeleton } from "antd";
import { Fragment } from "react";

import { useAppDispatch, useAppSelector } from "@/store";
import { starWarsApi } from "@/store/starWarsApi";
import { CARD_WIDTH } from "@/constants";
import { setPage } from "@/store/searchSlice";
import { LoadingSkeletons } from "@/app/components/HomePage/components/LoadingSkeletons";
import { PersonCard } from "@/app/components/HomePage/components/PersonCard";

type Props = {
  search: string;
};

export const PersonsPaginatedGrid = ({ search }: Props) => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.search.page);

  const {
    data,
    isFetching,
    isLoading,
    error,
  } = starWarsApi.useSearchPeopleByNameQuery({ search, page });

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
    return <div>Error</div>;
  }

  if (!data?.results.length) {
    return <div>No people :(</div>;
  }

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {data!.results.map((person: any) => {
          return isFetching ? (
            <div key={person.url + "skeleton"} style={{ width: CARD_WIDTH }}>
              <Skeleton active />
              <Skeleton.Button active />
            </div>
          ) : (
            <Fragment key={person.url}>
              <PersonCard
                name={person.name}
                height={person.height}
                eye_color={person.eye_color}
                mass={person.mass}
                url={person.url}
              />
            </Fragment>
          );
        })}
      </Row>
      <Pagination
        current={page}
        total={data.count}
        showSizeChanger={false}
        onChange={handleChange}
      />
    </>
  );
};
