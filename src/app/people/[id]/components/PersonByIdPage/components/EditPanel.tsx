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
  const [birthYear, setBirthYear] = useState(person.birth_year);
  const [mass, setMass] = useState(person.mass);

  const handleClick = () => {
    dispatch(
      setEditedPersons({ ...person, name, birth_year: birthYear, mass })
    );
    dispatch(setIsEditMode(false));
  };

  return (
    <div style={{ maxWidth: "33%", marginTop: "48px" }}>
      <label style={{ marginTop: "8px" }}>Name</label>
      <Input
        style={{ marginTop: "8px", marginBottom: "8px" }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label style={{ marginTop: "8px", marginBottom: "8px" }}>
        Birth year
      </label>
      <Input
        style={{ marginTop: "8px", marginBottom: "8px" }}
        value={birthYear}
        onChange={(e) => setBirthYear(e.target.value)}
      />
      <label style={{ marginTop: "8px" }}>Mass</label>
      <Input
        style={{ marginTop: "8px", marginBottom: "8px" }}
        type="number"
        value={mass}
        onChange={(e) =>
          setMass((parseInt(e.target.value, 10) || 0).toString())
        }
      />
      <Button style={{ marginTop: "8px" }} onClick={handleClick}>
        Submit changes
      </Button>
    </div>
  );
};
