import { Filters } from "@/store/searchSlice";

export const ITEMS_PER_PAGE = 10;
export const CARD_WIDTH = 400;
export const DEFAULT_FILTERS: Filters = {
  eye_color: "any",
  height: [0, Infinity],
  mass: [0, Infinity],
};
