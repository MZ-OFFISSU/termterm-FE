import QuizApi from "@api/QuizApi";
import QuizReviewRouter from "@components/quiz/QuizReviewRouter";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackScreenProps } from "@react-navigation/stack";
import { QuizReviewDetail } from "Quiz";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export type Props = StackScreenProps<RootStackParamList, "QuizReview">;

const QuizReview = ({ navigation }: Props) => {
  const quizApi = new QuizApi();
  const [COLOR, mode] = useThemeStyle();
  const [quizReviewList, setQuizReviewList] = useState<QuizReviewDetail[]>([]);

  const getQuizReviewList = async () => {
    try {
      const res = await quizApi.getFinalQuizReview();
      const termNameArr = res.map((item) => {
        return getMainTermName(item.termName);
      });

      const updatedReviewList = res.map((item, index) => {
        return {
          ...item,
          termName: termNameArr[index],
        };
      });
      setQuizReviewList(updatedReviewList);
      console.log(updatedReviewList);
    } catch (err) {
      console.log(err);
    }
  };

  const getMainTermName = (word: string): string => {
    const match = word.split(" :: ");
    if (match.length > 1) {
      return match[1];
    } else {
      return word;
    }
  };

  useEffect(() => {
    getQuizReviewList();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: COLOR.Background.surface }}>
      <Container>
        {quizReviewList.map((item, idx) => (
          <QuizReviewRouter
            key={idx}
            id={item.termId}
            answer={item.isAnswerRight}
            wordAnswer={item.termName}
            userAnswer={item.wrongChoices[0]}
            onPress={() => navigation.navigate("QuizResult", { id: item.termId })}
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
