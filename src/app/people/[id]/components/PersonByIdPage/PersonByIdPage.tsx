"use client";

import React, { Button, Skeleton } from "antd";
import { LeftOutlined } from "@ant-design/icons";

import Link from "next/link";
import { starWarsApi } from "@/store/starWarsApi";
import { useAppDispatch, useAppSelector } from "@/store";
import { EditPanel } from "./components/EditPanel";
import { setIsEditMode } from "@/store/editSlice";
import EmptyContainer from "@/components/EmptyContainer";
import Card from "antd/es/card/Card";

export const PersonByIdPage = ({ id }: { id: string }) => {
  const {
    data,
    isLoading,
    isFetching,
    error,
  } = starWarsApi.useGetPersonByIdQuery(id);

  const {
    data: planet,
    isFetching: isFetchingPlanet,
  } = starWarsApi.useGetHomeworldQuery(data?.homeworld?.split("/")?.at(-2)!, {
    skip: !data || !data?.homeworld,
  });

  const dispatch = useAppDispatch();
  const isEditMode = useAppSelector((state) => state.edit.isEditMode);
  const editedPersons = useAppSelector((state) => state.edit.editedPersons);

  const handleClick = () => {
    dispatch(setIsEditMode(true));
  };

  if (isLoading || isFetching || isFetchingPlanet) {
    return (
      <div style={{ width: 500 }}>
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (error) {
    return <EmptyContainer title="Error, something went wrong" />;
  }

  if (!data) {
    return <EmptyContainer title="There is no such person, :(" />;
  }
  const editedPerson = editedPersons.find((p) => p.url === data.url);
  const person = !editedPerson ? data : editedPerson;

  return (
    <>
      {isEditMode ? (
        <EditPanel person={person} />
      ) : (
        <>
          <Link href="/" onClick={handleClick}>
            <LeftOutlined style={{ marginTop: "48px" }} />
          </Link>
          <Card title={person.name} bordered={false} style={{ maxWidth: 820 }}>
            <p>
              <b>Height</b> - {person.height}
            </p>
            <p>
              <b>Mass</b> - {person.mass}
            </p>
            <p>
              <b>Eye color</b> - {person.eye_color}
            </p>
            <p>
              <b>Hair color</b> - {person.hair_color}
            </p>
            <p>
              <b>Birth year</b> - {person.birth_year}
            </p>
            {planet && (
              <Card type="inner" title="Homeworld">
                <p>
                  <b>Name</b> - {planet?.name}
                </p>
                <p>
                  <b>Population</b> - {planet?.population}
                </p>
                <p>
                  <b>Climate</b> - {planet?.climate}
                </p>
                <p>
                  <b>Terrain</b> - {planet?.terrain}
                </p>
              </Card>
            )}
          </Card>
          <Button style={{ marginTop: "16px" }} onClick={handleClick}>
            Edit
          </Button>
        </>
      )}
    </>
  );
};
