import { atom } from "recoil";

interface HeaderProps {
  id: number;
  curNum: number;
  maxNum: number;
  bookmarked: boolean;
  folderId: number;
}

export const DEFAULT_VALUE: HeaderProps = {
  id: 0,
  curNum: 0,
  maxNum: 0,
  bookmarked: false,
  folderId: 0,
};

export const iconHeaderState = atom<HeaderProps>({
  key: "headerState",
  default: DEFAULT_VALUE,
});

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});

export const bookmarkArrayState = atom<boolean[]>({
  key: "bookmarkArrayState",
  default: [],
});

export const termIdArrayState = atom<number[]>({
  key: "termIdArrayState",
  default: [],
});
