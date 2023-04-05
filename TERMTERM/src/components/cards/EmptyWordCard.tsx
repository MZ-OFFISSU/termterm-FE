import styled from "styled-components/native";
import { useState, useEffect } from "react";
import {
  TouchableOpacityProps,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import { DARK_COLOR_STYLE, LIGHT_COLOR_STYLE, TEXT_STYLES, TEXT_STYLE_SIZE, TEXT_STYLE_WEIGHT } from "@style/designSystem";
import { UrlText, NonScrollContainer, CustomButton, BUTTON_TYPE, BUTTON_STATE } from "@components/index";
import { screenWidth } from "@style/dimensions";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

interface Props extends TouchableOpacityProps {
  title: string;
  img: ImageSourcePropType;
  isFocused: boolean;
}

const EmptyWordCard = () => {
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
      <Card>
        <AutoSizedImage
          source={require("@assets/bookmark-character.png")}
          width={width}
        />
        <TitleBox>
          <Title>아직 북마크를 하지 않으셨군요!</Title>
          <SubTitle>북마크를 하면 용어를 더욱</SubTitle>
          <SubTitle>쉽게 다시 볼 수 있어요</SubTitle>
        </TitleBox>
        <WordButton>
          <ButtonText>북마크 하러 가기 〉 </ButtonText>
        </WordButton>
      </Card>
    )
}

const Card = styled.View`
  width: 358px;
  height: 358px;
  margin: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${LIGHT_COLOR_STYLE.THEME.primary[10]};
  margin-bottom: 30px;
`;

const TitleBox = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
`;

// const Title = styled.Text`
//   font-size: ${TEXT_STYLE_SIZE.md1};
//   font-weight: ${TEXT_STYLE_WEIGHT.Eb};
//   color: ${LIGHT_COLOR_STYLE.Text.active};
//   text-align: center;
// `;
const Title = styled.Text`
  font-size: 20px;
  font-weight: 900;
  color: #0d0d0d;
  text-align: center;
`;

// const SubTitle = styled.Text`
//   font-size: ${TEXT_STYLE_SIZE.sm};
//   font-weight: ${TEXT_STYLE_WEIGHT.Reg};
//   color: ${LIGHT_COLOR_STYLE.Text.default};
//   text-align: center;
// `;
const SubTitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #565656;
  text-align: center;
  margin: 3px 0;
`;

const WordButton = styled.TouchableOpacity`
  width: 318px;
  height: 44px;
  z-index: 2;
  background-color: #19d24d;
  border-radius: 50%;
  margin-top: 30px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin: auto 0;
  color: ${DARK_COLOR_STYLE.Text.active};
`;

export default EmptyWordCard;