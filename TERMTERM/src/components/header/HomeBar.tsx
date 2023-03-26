import HeaderWrapper from "./HeaderWrapper";
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
  const [COLOR, mode] = useThemeStyle();
  return (
    <HeaderWrapper style={{ justifyContent: "space-between" }}>
      <AutoSizedImage
        source={require("@assets/icon/header-icon.png")}
        height={24}
        style={{ marginLeft: 20 }}
      />
      <CaretBtn onPress={() => onSearch()} style={{ marginRight: 20 }}>
        <Entypo name="magnifying-glass" size={24} color={COLOR.Text.active} />
      </CaretBtn>
    </HeaderWrapper>
  );
};

export default HomeBar;
