import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { TouchableOpacityProps } from "react-native";
import { colorTheme, TEXT_STYLES, TYPO_STYLE } from "@style/designSystem";
import { screenWidth } from "@style/dimensions";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { Fontisto } from "@expo/vector-icons";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const EmptyWordCard = ({ ...props }: TouchableOpacityProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [COLOR, mode] = useThemeStyle();
  const [width, setWidth] = useState(83);
  /** 북마크 여부 상태 */
  const [bookmarkBool, setBookmarkBool] = useState(false);

  /** 아이콘 너비 계산 함수 */
  const calcWidth = () => {
    if (screenWidth < 390) return;
    if (screenWidth < 435) {
      setWidth(118);
      return;
    }
    if (screenWidth < 500) {
      setWidth(143);
      return;
    }
    if (screenWidth > 500) {
      setWidth(183);
      return;
    }
  };

  useEffect(() => {
    calcWidth();
  }, []);

  return (
    <Card COLOR={COLOR} mode={mode} {...props}>
      <AutoSizedImage
        source={require("@assets/bookmark-character.png")}
        width={width}
      />
      <TitleBox>
        <Title COLOR={COLOR}>아직 아카이빙을 하지 않으셨군요!</Title>
        <SubTitle
          COLOR={COLOR}
        >{`아카이빙을 하면 용어를 더욱\n쉽게 다시 볼 수 있어요`}</SubTitle>
      </TitleBox>
      <WordButton COLOR={COLOR} onPress={() => navigation.navigate("Search")}>
        <ButtonText COLOR={COLOR}>아카이빙 하러 가기</ButtonText>
        <Fontisto
          name="angle-right"
          // TODO : size 해결
          size={TEXT_STYLES["2xsm"].Reg?.fontSize}
          color={COLOR.Text.lighten}
          style={{ marginLeft: 10 }}
        />
      </WordButton>
    </Card>
  );
};

const Card = styled.View<{ COLOR: colorTheme; mode: boolean }>`
  width: 100%;
  height: 358px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${(props) =>
    props.mode
      ? props.COLOR.THEME.primary[10]
      : props.COLOR.Background.onSurface};
  margin-top: 10px;
`;

const TitleBox = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[1].ExtraBold};
  color: ${(props) => props.COLOR.Text.active};
  text-align: center;
  line-height: 37%;
`;

const SubTitle = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[3].Regular};
  color: ${(props) => props.COLOR.Text.default};
  text-align: center;
  margin-top: 10px;
  line-height: 23px;
`;

const WordButton = styled.TouchableOpacity<{ COLOR: colorTheme }>`
  width: 90%;
  max-width: 318px;
  height: 45px;
  z-index: 2;
  background-color: ${(props) => props.COLOR.THEME.primary[130]};
  border-radius: 50%;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text<{ COLOR: colorTheme }>`
  ${TYPO_STYLE.Body[2].SemiBold};
  text-align: center;
  margin: auto 0;
  color: ${(props) => props.COLOR.Text.lighten};
`;

export default EmptyWordCard;
