import HeaderWrapper from "./HeaderWrapper";
import {
  NavigatorTitle,
  TitleWrapper,
  CaretBtn,
} from "../common/NavigatorTitle";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  title?: string;
  onBack: () => void;
}

/**
 * x버튼이 있는 바
 */
const XBar = ({ title, onBack }: Props) => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <HeaderWrapper style={{ justifyContent: "flex-end" }}>
      <TitleWrapper>
        <NavigatorTitle COLOR={COLOR}>{title}</NavigatorTitle>
      </TitleWrapper>
      <CaretBtn onPress={() => onBack()} style={{ marginRight: 15 }}>
        <AntDesign name="close" size={20} color={COLOR.Text.active} />
      </CaretBtn>
    </HeaderWrapper>
  );
};

export default XBar;
