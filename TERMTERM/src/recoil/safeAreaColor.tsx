import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { atom } from "recoil";

export interface SafeColor {
  bgColor: string;
  styleColor: "light-content" | "dark-content";
}

export const defaultSafeColor: SafeColor = {
  bgColor: LIGHT_COLOR_STYLE.Background.surface,
  styleColor: "dark-content",
};

/**
 * safeArea에 적용될 컬러
 */
export const safeAreaColorState = atom<SafeColor>({
  key: "safeAreaColor",
  default: defaultSafeColor,
});
