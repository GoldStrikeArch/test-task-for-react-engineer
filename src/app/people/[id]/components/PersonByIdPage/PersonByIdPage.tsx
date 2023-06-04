"use client";

import React, { Button, Skeleton } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Input from "antd/es/input/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import type { Person } from "@/types/starWarsApiTypes";
import { starWarsApi } from "@/store/starWarsApi";
import { useAppDispatch } from "@/store";

const EditPanel = ({
  data,
  id,
  setIsEditMode,
}: {
  data: Person;
  id: string;
  setIsEditMode: any;
}) => {
  const [name, setName] = useState(data.name);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      starWarsApi.util.updateQueryData("getPersonById", id, (prevData) => {
        console.log("prev data is", prevData.name);
        return { ...prevData, name };
      })
    );

    setIsEditMode(false);
  };

  return (
    <>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={handleClick}>Submit changes</Button>
    </>
  );
};

export const PersonByIdPage = ({ id }: { id: string }) => {
  const { data, isLoading, isFetching, error } = starWarsApi.nByIdQuery(id);

  const [isEditMode, setIsEditMode] = useState(false);

  const router = useRouter();

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
      <Link href="/">
        <LeftOutlined />
      </Link>
      <Button
        onClick={() => {
          router.back();
        }}
      >
        <LeftOutlined />
      </Button>
      {isEditMode ? (
        <EditPanel data={data} id={id} setIsEditMode={setIsEditMode} />
      ) : (
        <>
          <Title>{data.name}</Title>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <Button onClick={() => setIsEditMode(true)}>Edit</Button>
        </>
      )}
    </>
  );
};
