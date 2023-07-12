import AutoSizedImage from "@components/common/AutoSizedImage";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { screenWidth } from "@style/dimensions";
import { useEffect, useState } from "react";
import styled from "styled-components/native";

const AnswerReminder = () => {
  const [COLOR, mode] = useThemeStyle();
  const [width, setWidth] = useState(24);
  const [answer, setAnswer] = useState("Button");

  const calcWidth = () => {
    if (screenWidth < 390) return;
    if (screenWidth < 435) {
      setWidth(29);
      return;
    }
    if (screenWidth < 500) {
      setWidth(34);
      return;
    }
    if (screenWidth > 500) {
      setWidth(39);
      return;
    }
  };

  useEffect(() => {
    calcWidth();
  }, []);

  return (
    <Container COLOR={COLOR} mode={mode}>
      <AutoSizedImage
        source={require("@assets/icon/x-icon.png")}
        width={width}
      />
      <AnswerText COLOR={COLOR} mode={mode}>
        내가 생각한 답은 <BoldText COLOR={COLOR} mode={mode}>{answer}</BoldText>
        이에요
      </AnswerText>
    </Container>
  );
};

export default AnswerReminder;

const Container = styled.View<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  width: 90%;
  height: 55px;
  background-color: ${(props) => props.COLOR.THEME.negative[10]};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  margin: 20px auto;
  border-radius: 10px;
`;

const AnswerText = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  ${TYPO_STYLE.Body[2].Medium};
  color: ${(props) => props.COLOR.Text.active};
  margin-left: 10px;
`;

const BoldText = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  ${TYPO_STYLE.Body[2].Bold};
  color: ${(props) => props.COLOR.Text.active};
`;
