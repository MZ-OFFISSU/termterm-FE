import styled from "styled-components/native";
import { useState, useEffect } from "react";
import {
  TouchableOpacityProps,
  ImageSourcePropType,
  Image,
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

const DailyQuizRouter = () => {
    const [width, setWidth] = useState(20);
    const [btnWidth, setBtnWidth] = useState(40);

    return (
      <Container>
        <FlexContainer>
          <AutoSizedImage
              source={require("@assets/test.png")}
              width={width}
              style={{ marginTop: 12 }}
          />
          <Title>Daily 용어 퀴즈를 시작해 볼까요?</Title>
          <AutoSizedImage
              source = {require("@assets/arrow-button.png")}
              width={btnWidth}
          />
        </FlexContainer>
      </Container>
    )
}

const Container = styled.View`
  width: 358px;
  height: 115px;
  margin-bottom: 40px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${LIGHT_COLOR_STYLE.THEME.secondary[20]};
`;

const FlexContainer = styled.View`
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto 0;
  align-item: center;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #0d0d0d;
  text-align: center;
  margin-top: 15px;
`;


export default DailyQuizRouter;