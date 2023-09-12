import { atom } from "recoil";

export const walkthroughState = atom<boolean>({
  key: "walkthrough",
  default: true,
})