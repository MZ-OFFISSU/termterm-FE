import AutoSizedImage from "@components/common/AutoSizedImage";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { quizReviewProps } from "@interfaces/quizReview";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackScreenProps } from "@react-navigation/stack";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { screenWidth } from "@style/dimensions";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { CaretBtn } from "..";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export type Props = quizReviewProps & StackScreenProps<RootStackParamList, "QuizReview">;

const QuizReviewRouter = ({ id, answer, wordAnswer, userAnswer, navigation, ...props }: Props) => {
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
        {wordAnswer}
      </AnswerText>
      {/* TODO : navigation 연결 */}
      <CaretBtn onPress={() => navigation.navigate("QuizResult")}>
        <AntDesign name="right" size={20} color={COLOR.Neutral[90]} />
      </CaretBtn>
    </Container>
  );
};

export default QuizReviewRouter;

const Container = styled.View<{
  COLOR: colorTheme;
  mode: boolean;
  answer: boolean;
}>`
  width: 90%;
  height: 55px;
  background-color: ${(props) =>
    props.answer
      ? props.COLOR.THEME.positive[10]
      : props.COLOR.THEME.negative[10]};
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