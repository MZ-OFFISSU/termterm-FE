import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyle } from "@hooks/useThemeStyle";

const Search = () => {
  const [COLOR] = useThemeStyle();

  return (
    <SafeAreaView
      style={{ backgroundColor: COLOR.Background.surface }}
    ></SafeAreaView>
  );
};

export default Search;
