import NavigationBar from "../common/NavigationBar";
import { CaretBtn } from "../common/NavigatorTitle";
import { Entypo } from "@expo/vector-icons";
import { useThemeStyle } from "@hooks/useThemeStyle";
import AutoSizedImage from "@components/common/AutoSizedImage";

interface Props {
  onSearch: () => void;
}
/**
 * 메인 화면에서 사용될 헤더 컴포넌트
 */
const HomeBar = ({ onSearch }: Props) => {
  const [COLOR] = useThemeStyle();
  return (
    <NavigationBar style={{ justifyContent: "space-between" }}>
      <AutoSizedImage source={require("@assets/icon/header-icon.png")} />
      <CaretBtn onPress={() => onSearch()}>
        <Entypo name="magnifying-glass" size={22} color={COLOR.Text.active} />
      </CaretBtn>
    </NavigationBar>
  );
};

export default HomeBar;
