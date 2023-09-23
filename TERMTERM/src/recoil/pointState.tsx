import { atom } from "recoil";

/** 포인트 */
export const pointState = atom<number>({
  key: "pointState",
  default: 0,
});
