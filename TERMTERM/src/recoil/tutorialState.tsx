import { atom } from "recoil";

export const tutorialState = atom<boolean>({
  key: "tutorial",
  default: false,
});

export const coachState = atom<boolean>({
  key: "coachmark",
  default: false,
});
