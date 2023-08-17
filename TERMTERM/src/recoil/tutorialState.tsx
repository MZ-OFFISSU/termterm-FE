import { atom } from "recoil";

export const tutorialState = atom<boolean>({
  key: "tutorial",
  default: true,
});
