import { atom } from "recoil";

interface HeaderProps {
  id: number;
  curNum: number;
  maxNum: number;
  bookmarked: boolean;
}

export const DEFAULT_VALUE: HeaderProps = {
  id: 0,
  curNum: 0,
  maxNum: 0,
  bookmarked: false,
};

export const iconHeaderState = atom<HeaderProps>({
  key: "headerState",
  default: DEFAULT_VALUE,
});

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});
