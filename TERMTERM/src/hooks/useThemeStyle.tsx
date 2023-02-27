import { useState, useEffect } from "react";
import {
  LIGHT_COLOR_STYLE,
  DARK_COLOR_STYLE,
  colorTheme,
} from "@style/designSystem";

/**
 * 테마에 따라 COLOR_STYLE을 변동하여 반환하는 hooks
 * @param theme 테마를 결정하는 전역 상태. true는 lighten, false는 dark
 */
export function useThemeStyle(theme: boolean): [colorTheme] {
  const [themeStyle, setThemeStyle] = useState<colorTheme>(LIGHT_COLOR_STYLE);

  useEffect(() => {
    setThemeStyle(theme ? LIGHT_COLOR_STYLE : DARK_COLOR_STYLE);
  }, [theme]);

  return [themeStyle];
}
