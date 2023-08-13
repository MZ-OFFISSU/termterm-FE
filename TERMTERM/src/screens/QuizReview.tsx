import QuizApi from "@api/QuizApi";
import QuizReviewRouter from "@components/quiz/QuizReviewRouter";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { quizReviewProps } from "@interfaces/quizReview";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackScreenProps } from "@react-navigation/stack";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { QuizReviewDetail } from "Quiz";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export type Props = StackScreenProps<RootStackParamList, "QuizReview">;

const QuizReview = ({ navigation }: Props) => {
  const quizApi = new QuizApi();
  const [COLOR, mode] = useThemeStyle();
  const [quizReviewList, setQuizReviewList] = useState<QuizReviewDetail[]>([]);
  const [isAnswer, setIsAnswer] = useState<boolean[]>([]);

  const getQuizReviewList = async () => {
    try {
      // TODO : Quiz 부분 검토 완료 시 확인
      setQuizReviewList(await quizApi.getFinalQuizReview());
      const answerArray: boolean[] = quizReviewList.map(
        (item) => item.isAnswerRight
      );
      setIsAnswer(answerArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => console.log(getQuizReviewList()), []);

  return (
    <SafeAreaView style={{ backgroundColor: COLOR.Background.surface }}>
      <Container>
        {dummy.map((item, idx) => (
          <QuizReviewRouter
            key={idx}
            id={item.termId}
            answer={item.isAnswerRight}
            wordAnswer={item.termName}
            userAnswer={item.wrongChoices[0]}
            onPress={() => navigation.navigate("QuizResult", { id: 0 })}
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

/** TODO : 비어있는 퀴즈 리뷰 데이터 대체 임시 데이터 */
const dummy: Array<QuizReviewDetail> = [
  {
    bookmarked: "NO",
    isAnswerRight: true,
    termDescription: "이 용어는 프로덕트 매니저입니다.",
    termId: 1,
    termName: "Product Manager",
    termSource: "https://www.naver.com",
    wrongChoices: ["Product Manager"],
  },
  {
    bookmarked: "YES",
    isAnswerRight: false,
    termDescription: "이 용어는 모달입니다.",
    termId: 2,
    termName: "Modal",
    termSource: "https://www.google.com",
    wrongChoices: ["Slide Menu"],
  },
  {
    bookmarked: "YES",
    isAnswerRight: true,
    termDescription: "이 용어는 스크럼입니다.",
    termId: 3,
    termName: "Scrum",
    termSource: "https://www.daum.com",
    wrongChoices: ["Scrum"],
  },
  {
    bookmarked: "NO",
    isAnswerRight: true,
    termDescription: "이 용어는 깃허브입니다.",
    termId: 4,
    termName: "Github",
    termSource: "https://www.meta.com",
    wrongChoices: ["Moda"],
  },
  {
    bookmarked: "YES",
    isAnswerRight: false,
    termDescription: "이 용어는 딤드입니다.",
    termId: 5,
    termName: "Dimmed",
    termSource: "https://www.instagram.com",
    wrongChoices: ["Dimmed"],
  },
];
