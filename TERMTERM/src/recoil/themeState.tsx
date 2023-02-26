import { atom } from "recoil";

/**
 * 라이트 모드 : true
 * 다크모드 : false
 */
export const themeState = atom<boolean>({
  key: "theme",
  default: true,
});
