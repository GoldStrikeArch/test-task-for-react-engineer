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
  isClientOnlyEdited: boolean;
  url: string;
};

export type GetPeopleResponse = {
  count: number;
  next: URLstring | null;
  previous: URLstring | null;
  results: Person[];
};

export type GetHomeworldResponse = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  url: URLstring;
};
