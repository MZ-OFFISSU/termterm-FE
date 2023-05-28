import { useRoute } from "@react-navigation/native";
import { safeAreaColorState } from "@recoil/safeAreaColor";
import { themeState } from "@recoil/themeState";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export const useSafeColor = () => {
  const [safeColor, setSafeColor] = useRecoilState(safeAreaColorState);
  const curTheme = useRecoilValue(themeState);
  const route = useRoute();

  useEffect(() => {
    switch (route.name) {
      case "Login":
        setSafeColor("#1F1F1F");
        break;
      case "Support":
        setSafeColor(LIGHT_COLOR_STYLE.Background.surface);
        break;
      case "Onboarding":
        setSafeColor(LIGHT_COLOR_STYLE.Background.surface);
        break;
      default:
        setSafeColor(
          curTheme ? LIGHT_COLOR_STYLE.Background.surface : "#1F1F1F"
        );
        break;
    }
  }, [route.name, curTheme]);
};