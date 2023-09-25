import AutoSizedImage from "@components/common/AutoSizedImage";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { screenWidth } from "@style/dimensions";
import { divideTerm } from "@utils/termCutter";
import { useEffect, useState } from "react";
import styled from "styled-components/native";

interface AnswerReminderProps {
  /** 정답 여부 */
  answer: boolean;
  /** 사용자가 선택한 답 */
  userAnswer: string;
}

const AnswerReminder = ({ answer, userAnswer }: AnswerReminderProps) => {
  const [COLOR, mode] = useThemeStyle();
  const [width, setWidth] = useState(24);
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
    <Container COLOR={COLOR} mode={mode} answer={answer}>
      <AutoSizedImage
        source={
          answer
            ? require("@assets/icon/correct-icon.png")
            : require("@assets/icon/x-icon.png")
        }
        width={width}
      />
      <AnswerText COLOR={COLOR} mode={mode}>
        {answer ? (
          "한 번에 정답을 맞췄어요!"
        ) : (
          <>
            내가 생각한 답은{" "}
            <BoldText COLOR={COLOR} mode={mode}>
              {divideTerm(userAnswer)[0]}
            </BoldText>
            이에요
          </>
        )}
      </AnswerText>
    </Container>
  );
};

export default AnswerReminder;

const Container = styled.View<{
  COLOR: colorTheme;
  mode: boolean;
  answer: boolean;
}>`
  width: 90%;
  height: 55px;
  background-color: ${(props) =>
    props.mode
      ? props.answer
        ? props.COLOR.THEME.positive[10]
        : props.COLOR.THEME.negative[10]
      : props.COLOR.Background.onSurface};
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
  ${TYPO_STYLE.Subheading[1].Regular};
  color: ${(props) => props.COLOR.Text.active};
  margin-left: 10px;
`;

const BoldText = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  ${TYPO_STYLE.Subheading[1].Bold};
  color: ${(props) => props.COLOR.Text.active};
`;
