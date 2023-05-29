"use client";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import React, { Button, Card, Pagination, Space, Skeleton } from "antd";
import type { PaginationProps } from "antd";
import { starWarsApi } from "@/app/store";
import { Fragment, useState } from "react";
import Link from "next/link";

const App = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = starWarsApi.useGetPeopleQuery(page);

  const handleChange: PaginationProps["onChange"] = (page) => {
    setPage(page);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data?.results) {
    return <div>No people :(</div>;
  }
  return (
    <main>
      <h1>Lala</h1>
      <Space direction="horizontal" size={16}>
        {data!.results.map((person) => {
          return isFetching ? (
            <div style={{ width: 400 }}>
              <Skeleton active />
            </div>
          ) : (
            <Fragment key={Math.random() * Date.now()}>
              <Card title={person.name} style={{ width: 300 }}>
                <p>{person.birth_year}</p>
                <p>{person.height}</p>
                <p>{person.mass}</p>
                <p>{person.eye_color}</p>
                <p>{person.skin_color}</p>
                <Link href={`/people/${person.url.split("/").at(-2)}`}>
                  <Button className="primary">See details</Button>
                </Link>
              </Card>
            </Fragment>
          );
        })}
      </Space>
      <Pagination
        current={page}
        total={data.count}
        showSizeChanger={false}
        onChange={handleChange}
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
