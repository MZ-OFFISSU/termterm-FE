import React from "react";
import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { screenHeight, screenWidth } from "@style/dimensions";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { LIGHT_COLOR_STYLE, TEXT_STYLES } from "@style/designSystem";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { WtProps } from "@interfaces/walkthrough";

interface Props {
  walkthrough: WtProps;
}

const Walkthrough = ({ walkthrough }: Props) => {
  const [width, setWidth] = useState(300);

  /** 아이콘 너비 계산 함수 */
  const calcWidth = () => {
    if (screenWidth < 390) return;
    if (screenWidth < 435) {
      setWidth(340);
      return;
    }
    if (screenWidth < 500) {
      setWidth(380);
      return;
    }
    if (screenWidth > 500) {
      setWidth(420);
      return;
    }
  };
  useEffect(() => {
    calcWidth();
  }, []);

  return (
    <Wrapper>
      <Title>{walkthrough.title}</Title>
      <SubText>{walkthrough.children}</SubText>
      <AutoSizedImage
        source={walkthrough.image}
        width={width}
        style={{ marginTop: "8%" }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${LIGHT_COLOR_STYLE.Background.surface};
  align-items: center;
  position: relative;
`;

const Title = styled.Text`
  color: ${LIGHT_COLOR_STYLE.THEME.primary[130]};
  font-size: ${TEXT_STYLES.lg.Eb?.fontSize}px;
  font-weight: ${TEXT_STYLES.lg.Eb?.fontWeight};
  margin-top: 30px;
`;

const SubText = styled.Text`
  color: ${LIGHT_COLOR_STYLE.Text.active};
  font-size: 26px;
  font-weight: 400;
  color: ${LIGHT_COLOR_STYLE.Text.active};
  text-align: center;
  margin: 30px 0;
  line-height: 32px;
`;

export default Walkthrough;
