import React from "react";
import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { screenHeight, screenWidth } from "@style/dimensions";
import { LIGHT_COLOR_STYLE, TYPO_STYLE } from "@style/designSystem";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { WtProps } from "@interfaces/walkthrough";

interface Props {
  walkthrough: WtProps;
}

const Walkthrough = ({ walkthrough }: Props) => {
  const [height, setHeight] = useState(480);
  const [ratio, setRatio] = useState(3);

  /** 아이콘 높이 계산 함수 */
  const calcHeight = () => {
    if (screenHeight < 812) return;
    if (screenHeight < 842) {
      setRatio(10);
      setHeight(500);
      return;
    }
    if (screenHeight < 872) {
      setRatio(10);
      setHeight(520);
      return;
    }
    if (screenHeight > 912) {
      setRatio(10);
      setHeight(540);
      return;
    }
  };
  useEffect(() => {
    calcHeight();
  }, []);

  return (
    <Wrapper>
      <Title>{walkthrough.title}</Title>
      <SubText>{walkthrough.children}</SubText>
      <AutoSizedImage
        source={walkthrough.image}
        height={height}
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
  ${TYPO_STYLE.Heading[3].ExtraBold};
`;

const SubText = styled.Text`
  color: ${LIGHT_COLOR_STYLE.Text.active};
  font-size: 21px;
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
  line-height: 35px;
`;

export default Walkthrough;
