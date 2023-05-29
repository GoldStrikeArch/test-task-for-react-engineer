"use client";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import React, { Button } from "antd";
import { starWarsApi } from "@/app/store";
import { Fragment, useState } from "react";

const Component = ({ id }: { id: string }) => {
  const { data, isLoading, isFetching } = starWarsApi.useGetPersonByIdQuery(id);

  if (isLoading) {
    return <div>Loading</div>;
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
