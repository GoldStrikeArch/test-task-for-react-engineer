import { CARD_WIDTH } from "@/constants";
import { Person } from "@/types/starWarsApiTypes";
import { Button } from "antd";
import Card from "antd/es/card/Card";
import Link from "next/link";

type Props = Pick<Person, "name" | "height" | "mass" | "url" | "eye_color">;

export const PersonCard = ({ name, height, mass, url, eye_color }: Props) => {
  const id = url.split("/").at(-2);

  return (
    <Card
      title={name}
      style={{ width: CARD_WIDTH, marginLeft: "8px", marginTop: "8px" }}
    >
      <p>
        <b>Height</b> - {height}
      </p>
      <p>
        <b>Mass</b> - {mass}
      </p>
      <p>
        <b>Eye color</b> - {eye_color}
      </p>
      <Link href={`/people/${id}`}>
        <Button className="primary">See details</Button>
      </Link>
    </Card>
  );
};
