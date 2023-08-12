import AutoSizedImage from "@components/common/AutoSizedImage";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { quizReviewProps } from "@interfaces/quizReview";

import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { screenWidth } from "@style/dimensions";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { CaretBtn } from "..";
import { AntDesign } from "@expo/vector-icons";

const QuizReviewRouter = ({
  id,
  answer,
  wordAnswer,
  userAnswer,
  onPress,
  ...props
}: quizReviewProps) => {
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
    <Container
      COLOR={COLOR}
      mode={mode}
      answer={answer}
      onPress={() => onPress()}
    >
      <AutoSizedImage
        source={
          answer
            ? require("@assets/icon/correct-icon.png")
            : require("@assets/icon/x-icon.png")
        }
        width={width}
      />
      <AnswerText COLOR={COLOR} mode={mode}>
        {wordAnswer}
      </AnswerText>
      <CaretBtn onPress={() => onPress()}>
        <AntDesign name="right" size={20} color={COLOR.Neutral[90]} />
      </CaretBtn>
    </Container>
  );
};

export default QuizReviewRouter;

const Container = styled.TouchableOpacity<{
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
  margin: 10px auto;
  border-radius: 10px;
`;

const AnswerText = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  ${TYPO_STYLE.Body[2].SemiBold};
  color: ${(props) => props.COLOR.Text.active};
  margin: 0 auto;
`;
