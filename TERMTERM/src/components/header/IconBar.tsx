import NavigationBar from "../common/NavigationBar";
import { NavigatorTitle, CaretBtn } from "../common/NavigatorTitle";
import { AntDesign } from "@expo/vector-icons";
import { useThemeStyle } from "@hooks/useThemeStyle";
import styled from "styled-components/native";
import { useRecoilState } from "recoil";
import { themeState } from "@recoil/themeState";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export enum Icon {
  fold,
  collapse,
}

interface Props {
  curNum?: number;
  maxNum?: number;
  onBack: () => void;
  icon: Icon;
  onPress: () => void;
  onDots: () => void;
}

/**
 * 아이콘과 함수를 유동적으로 삽입할 수 있는 헤더
 */
const IconBar = ({ curNum, maxNum, onBack, icon, onPress, onDots }: Props) => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [COLOR] = useThemeStyle();

  const Fold = () => {
    return theme ? (
      <AutoSizedImage source={require("@assets/icon/fold.png")} />
    ) : (
      <AutoSizedImage source={require("@assets/icon/fold-dark.png")} />
    );
  };

  const Collapse = () => {
    return theme ? (
      <AutoSizedImage source={require("@assets/icon/collapse.png")} />
    ) : (
      <AutoSizedImage source={require("@assets/icon/collapse-dark.png")} />
    );
  };

  return (
    <NavigationBar style={{ justifyContent: "space-between" }}>
      <CaretBtn onPress={() => onBack()}>
        <AntDesign name="left" size={24} color={COLOR.Text.active} />
      </CaretBtn>
      {maxNum && curNum ? (
        <NavigatorTitle style={{ color: COLOR.Text.active }}>
          {`${curNum}/${maxNum}`}
        </NavigatorTitle>
      ) : (
        <></>
      )}
      <ElementWrapper>
        <CaretBtn onPress={() => onPress()}>
          {icon === Icon.fold ? <Fold /> : <Collapse />}
        </CaretBtn>
        <CaretBtn onPress={() => onDots()}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color={COLOR.Text.active}
          />
        </CaretBtn>
      </ElementWrapper>
    </NavigationBar>
  );
};

const ElementWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default IconBar;
