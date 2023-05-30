"use client";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import React, { Skeleton } from "antd";
import { starWarsApi } from "@/app/store";

const Component = ({ id }: { id: string }) => {
  const {
    data,
    isLoading,
    isFetching,
    error,
  } = starWarsApi.useGetPersonByIdQuery(id);

  if (isLoading || isFetching) {
    return (
      <div style={{ width: 500 }}>
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>Empty :(</div>;
  }

  return (
    <>
      <h1>{data.name}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

const PersonByIdPage = ({ id }: { id: string }) => {
  return (
    <ApiProvider api={starWarsApi}>
      <Component id={id} />
    </ApiProvider>
  );
};

export default PersonByIdPage;
