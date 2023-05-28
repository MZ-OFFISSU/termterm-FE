import React from "react";
import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { screenWidth } from "@style/dimensions";
import { LIGHT_COLOR_STYLE, TEXT_STYLES } from "@style/designSystem";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { WtProps } from "@interfaces/walkthrough";

interface Props {
  walkthrough: WtProps;
}

const Walkthrough = ({ walkthrough }: Props) => {
  const [width, setWidth] = useState(screenWidth - 90);
  const [ratio, setRatio] = useState(3);

  /** 아이콘 너비 계산 함수 */
  const calcWidth = () => {
    if (screenWidth < 380) return;
    if (screenWidth < 435) {
      setRatio(10);
      setWidth(350);
      return;
    }
    if (screenWidth < 500) {
      setRatio(10);
      setWidth(490);
      return;
    }
    if (screenWidth > 500) {
      setRatio(10);
      setWidth(430);
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
        style={{ marginTop: `${ratio}%` }}
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
`;

const SubText = styled.Text`
  color: ${LIGHT_COLOR_STYLE.Text.active};
  font-size: ${TEXT_STYLES.lg.Eb?.fontSize}px;
  font-weight: 500;
  color: ${LIGHT_COLOR_STYLE.Text.active};
  text-align: center;
  margin-top: 20px;
  line-height: 35px;
`;

export default Walkthrough;
