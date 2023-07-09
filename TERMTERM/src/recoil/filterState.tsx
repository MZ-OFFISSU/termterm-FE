import { atom } from "recoil";

/** 전체 용어에서 필터링 */
export const filterState = atom<Array<string>>({
  key: "filterState",
  default: [],
});
