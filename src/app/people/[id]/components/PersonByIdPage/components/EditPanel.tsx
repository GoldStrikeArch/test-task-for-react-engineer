import { useAppDispatch } from "@/store";
import { setEditedPersons, setIsEditMode } from "@/store/editSlice";
import { Person } from "@/types/starWarsApiTypes";
import { Button } from "antd";
import Input from "antd/es/input/Input";
import { useState } from "react";

type Props = {
  person: Person;
};

export const EditPanel = ({ person }: Props) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(person.name);

  const handleClick = () => {
    dispatch(setEditedPersons({ ...person, name }));
    dispatch(setIsEditMode(false));
  };

  return (
    <>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={handleClick}>Submit changes</Button>
    </>
  );
};
