"use client";

import React, { Button, Skeleton } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

import Link from "next/link";
import { starWarsApi } from "@/store/starWarsApi";
import { useAppDispatch, useAppSelector } from "@/store";
import { EditPanel } from "./components/EditPanel";
import { setIsEditMode } from "@/store/editSlice";

export const PersonByIdPage = ({ id }: { id: string }) => {
  const {
    data,
    isLoading,
    isFetching,
    error,
  } = starWarsApi.useGetPersonByIdQuery(id);

  const dispatch = useAppDispatch();
  const isEditMode = useAppSelector((state) => state.edit.isEditMode);
  const editedPersons = useAppSelector((state) => state.edit.editedPersons);

  const handleClick = () => {
    dispatch(setIsEditMode(true));
  };

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
  const editedPerson = editedPersons.find((p) => p.url === data.url);
  const person = !editedPerson ? data : editedPerson;

  return (
    <>
      {isEditMode ? (
        <EditPanel person={person} />
      ) : (
        <>
          <Link href="/">
            <LeftOutlined />
          </Link>
          <Title>{person.name}</Title>
          <pre>{JSON.stringify(person, null, 2)}</pre>
          <Button onClick={handleClick}>Edit</Button>
        </>
      )}
    </>
  );
};
