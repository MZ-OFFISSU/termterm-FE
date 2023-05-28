import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { atom } from "recoil";

/**
 * safeArea에 적용될 컬러
 */
export const safeAreaColorState = atom<string>({
  key: "safeAreaColor",
  default: LIGHT_COLOR_STYLE.Background.surface,
});
