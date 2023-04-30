import HeaderWrapper from "./HeaderWrapper";
import {
  NavigatorTitle,
  NavigatorPager,
  CaretBtn,
  TitleWrapper,
} from "../common/NavigatorTitle";
import { AntDesign } from "@expo/vector-icons";
import { useThemeStyle } from "@hooks/useThemeStyle";

interface Props {
  title?: string;
  onBack: () => void;
  maxNum?: number;
  curNum?: number;
}

/**
 * 뒤로가기 버튼이 존재하는 기본 헤더바
 * [<    타이틀     현황]
 * 형태로 사용할 수 있으며,
 * 순서대로 props를 전달하면 된다.
 * 4~6번 컴포넌트
 */
const BackBar = ({ title, onBack, maxNum, curNum }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <HeaderWrapper style={{ justifyContent: "space-between" }}>
      <CaretBtn onPress={() => onBack()} style={{ marginLeft: 15 }}>
        <AntDesign name="left" size={20} color={COLOR.Text.active} />
      </CaretBtn>
      {title ? (
        <TitleWrapper>
          <NavigatorTitle
            style={{
              color: COLOR.Text.active,
            }}
          >
            {title}
          </NavigatorTitle>
        </TitleWrapper>
      ) : (
        <></>
      )}
      <NavigatorPager
        style={{ color: COLOR.Text.active, marginRight: 20 }}
        COLOR={COLOR}
      >
        {maxNum && curNum ? `${curNum}/${maxNum}` : ""}
      </NavigatorPager>
    </HeaderWrapper>
  );
};

export default BackBar;
