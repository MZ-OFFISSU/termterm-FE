import { atom } from "recoil";

const defaultValue = [""];

export const recentSearchState = atom<Array<string>>({
  key: "recentSearches",
  default: defaultValue,
});
