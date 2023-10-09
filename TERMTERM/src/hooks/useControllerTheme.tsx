import AsyncStorage from "@react-native-async-storage/async-storage";
import { themeState } from "@recoil/themeState";
import { useRecoilState } from "recoil";

export const useControllerTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const getTheme = async () => {
    const curTheme = await AsyncStorage.getItem("theme");

    if (curTheme === "light" || curTheme === undefined) setTheme(true);
    else setTheme(false);
  };

  const themeController = async (mode: boolean) => {
    if (mode) {
      setTheme(true);
      await AsyncStorage.setItem("theme", "light");
    } else {
      setTheme(false);
      await AsyncStorage.setItem("theme", "dark");
    }
  };

  return { getTheme, themeController, theme };
};
