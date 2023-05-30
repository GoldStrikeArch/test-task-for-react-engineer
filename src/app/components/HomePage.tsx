"use client";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import React, { Button, Card, Pagination, Space, Skeleton, Row } from "antd";
import type { PaginationProps } from "antd";
import { starWarsApi } from "@/app/store";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Search from "antd/es/input/Search";
import useDebounce from "@/utils/hooks/useDebounce";

const ITEMS_PER_PAGE = 10;
const CARD_WIDTH = 400;

//@ts-ignore
const PersonCard = ({ name, height, mass, url, eye_color }) => {
  return (
    <Card title={name} style={{ width: 300 }}>
      <p>
        <b>Height</b> - {height}
      </p>
      <p>
        <b>Mass</b> - {mass}
      </p>
      <p>
        <b>Eye color</b> - {eye_color}
      </p>
      <Link href={`/people/${url.split("/").at(-2)}`}>
        <Button className="primary">See details</Button>
      </Link>
    </Card>
  );
};

const LoadingSkeletons = () => {
  const arr = new Array(ITEMS_PER_PAGE).fill(false);

  return (
    <>
      {arr.map((_) => (
        <div style={{ width: CARD_WIDTH }}>
          <Skeleton active />
          <Skeleton.Button active />
        </div>
      ))}
    </>
  );
};

//@ts-ignore
const PersonsPaginatedGrid = ({ page, handleChange, search }) => {
  const {
    data,
    isFetching,
    isLoading,
    error,
  } = starWarsApi.useSearchPeopleByNameQuery({ search, page });

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
            <div style={{ width: CARD_WIDTH }}>
              <Skeleton active />
              <Skeleton.Button active />
            </div>
          ) : (
            <Fragment key={Math.random() * Date.now()}>
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

const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const handleChange: PaginationProps["onChange"] = (page) => {
    setPage(page);
  };

  useEffect(() => {
    if (debouncedSearch) {
      setPage(1);
    }
  }, [debouncedSearch]);

  return (
    <main>
      <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      <PersonsPaginatedGrid
        page={page}
        handleChange={handleChange}
        search={debouncedSearch}
      />
    </main>
  );
};

const StarWarsApp = () => {
  return (
    <ApiProvider api={starWarsApi}>
      <App />
    </ApiProvider>
  );
};

export default StarWarsApp;
