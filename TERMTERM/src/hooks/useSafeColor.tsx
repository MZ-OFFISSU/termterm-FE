import { useRoute } from "@react-navigation/native";
import { SafeColor, safeAreaColorState } from "@recoil/safeAreaColor";
import { themeState } from "@recoil/themeState";
import { DARK_COLOR_STYLE, LIGHT_COLOR_STYLE } from "@style/designSystem";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useSafeColor = () => {
  const setSafeColor = useSetRecoilState(safeAreaColorState);
  const curTheme = useRecoilValue(themeState);
  const route = useRoute();

  const darkSafe: SafeColor = {
    bgColor: DARK_COLOR_STYLE.Background.surface,
    styleColor: "light-content",
  };

  const lightSafe: SafeColor = {
    bgColor: LIGHT_COLOR_STYLE.Background.surface,
    styleColor: "dark-content",
  };

  useEffect(() => {
    switch (route.name) {
      case "Login":
        setSafeColor(darkSafe);
        break;
      case "Support":
        setSafeColor(lightSafe);
        break;
      case "Onboarding":
        setSafeColor(lightSafe);
        break;
      default:
        setSafeColor(curTheme ? lightSafe : darkSafe);
        break;
    }
  }, [route.name, curTheme]);
};
