"use client";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import React, { Button } from "antd";
import { starWarsApi } from "@/app/store";
import { Fragment, useState } from "react";
import Link from "next/link";

const App = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = starWarsApi.useGetPeopleQuery(page);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data?.results) {
    return <div>No people :(</div>;
  }
  return (
    <main>
      <h1>Lala</h1>
      {data!.results.map((person) => (
        <Fragment key={Math.random() * Date.now()}>
          <h3>{person.name}</h3>
          <Link href={`/people/${person.url.split("/").at(-2)}`}>
            <Button className="primary">See details</Button>
          </Link>
        </Fragment>
      ))}
      <Button
        onClick={() => setPage((page) => page - 1)}
        loading={isFetching}
        disabled={data.previous === null}
      >
        Prev
      </Button>
      <Button
        disabled={data.next === null}
        onClick={() => setPage((page) => page + 1)}
        loading={isFetching}
      >
        Next
      </Button>
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
