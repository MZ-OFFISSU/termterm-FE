import NavigationBar from "../common/NavigationBar";
import {
  NavigatorTitle,
  CaretBtn,
  TitleWrapper,
} from "../common/NavigatorTitle";
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
      <AutoSizedImage source={require("@assets/icon/fold.png")} height={22} />
    ) : (
      <AutoSizedImage
        source={require("@assets/icon/fold-dark.png")}
        height={22}
      />
    );
  };

  const Collapse = () => {
    return theme ? (
      <AutoSizedImage
        source={require("@assets/icon/collapse.png")}
        height={24}
      />
    ) : (
      <AutoSizedImage
        source={require("@assets/icon/collapse-dark.png")}
        height={24}
      />
    );
  };

  return (
    <NavigationBar style={{ justifyContent: "space-between" }}>
      <CaretBtn onPress={() => onBack()} style={{ marginLeft: 20 }}>
        <AntDesign name="left" size={24} color={COLOR.Text.active} />
      </CaretBtn>
      {maxNum && curNum ? (
        <TitleWrapper>
          <NavigatorTitle style={{ color: COLOR.Text.active }}>
            {`${curNum}/${maxNum}`}
          </NavigatorTitle>
        </TitleWrapper>
      ) : (
        <></>
      )}
      <ElementWrapper style={{ marginRight: 20 }}>
        <CaretBtn onPress={() => onPress()} style={{ marginRight: 15 }}>
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
