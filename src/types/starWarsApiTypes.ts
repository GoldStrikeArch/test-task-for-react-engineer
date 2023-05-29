type URLstring = string;
type DateString = string;
type Gender = "male" | "female";

export type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
  homeworld: URLstring;
  films: URLstring[];
  species: Array<unknown>;
  vehicles: URLstring[];
  starships: URLstring[];
  created: DateString;
  edited: DateString;
  url: string;
};

export type GetPeopleResponse = {
  count: number;
  next: URLstring | null;
  previous: URLstring | null;
  results: Person[];
};
