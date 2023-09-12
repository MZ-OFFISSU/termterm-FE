import { TermItem } from "Term";
import { atom } from "recoil";

/** 오늘의 용어 */
export const dailyTermState = atom<TermItem[]>({
  key: "dailyTermState",
  default: [],
});
