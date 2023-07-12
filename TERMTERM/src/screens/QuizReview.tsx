import QuizReviewRouter from "@components/quiz/QuizReviewRouter";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { quizReviewProps } from "@interfaces/quizReview";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

const QuizReview = () => {
  const [COLOR, mode] = useThemeStyle();

  return (
    <SafeAreaView style={{ backgroundColor: COLOR.Background.surface }}>
      <Container>
        {dummy.map((item, idx) => (
          <QuizReviewRouter
            key={idx}
            id={item.id}
            answer={item.answer}
            wordAnswer={item.wordAnswer}
            userAnswer={item.userAnswer}
          />
        ))}
      </Container>
    </SafeAreaView>
  );
};

export default QuizReview;

const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  margin-top: 10px;
`;

const dummy: Array<quizReviewProps> = [
  {
    id: 1,
    answer: true,
    wordAnswer: "Stakeholder",
    userAnswer: "Stakeholder",
  },
  {
    id: 2,
    answer: false,
    wordAnswer: "Modal",
    userAnswer: "Kick off",
  },
  {
    id: 3,
    answer: false,
    wordAnswer: "Kick off",
    userAnswer: "Modal",
  },
  {
    id: 4,
    answer: true,
    wordAnswer: "API",
    userAnswer: "API",
  },
  {
    id: 5,
    answer: false,
    wordAnswer: "Design System",
    userAnswer: "Design Guide",
  },
];
