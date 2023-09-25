import QuizApi from "@api/QuizApi";
import QuizReviewRouter from "@components/quiz/QuizReviewRouter";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackScreenProps } from "@react-navigation/stack";
import { eachQuizAnswerResult, quizReviewList } from "@recoil/quizState";
import { QuizReviewDetail } from "Quiz";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components/native";

export type Props = StackScreenProps<RootStackParamList, "QuizReview">;

const QuizReview = ({ navigation }: Props) => {
  const quizApi = new QuizApi();
  const [COLOR, mode] = useThemeStyle();
  // const [quizReviewList, setQuizReviewList] = useState<QuizReviewDetail[]>([]);
  const setEachQuizAnswer = useSetRecoilState(eachQuizAnswerResult);
  const setQuizReviewList = useSetRecoilState(quizReviewList);
  const quizReviewLocalList = useRecoilValue(quizReviewList);

  const getQuizReviewList = async () => {
    try {
      const res = await quizApi.getFinalQuizReview();
      
      const updatedQuizReviewList: QuizReviewDetail[] = res.map((item) => ({
        termId: item.termId as number,
        termName: item.termName as string,
        termDescription: item.termDescription as string,
        isAnswerRight: item.isAnswerRight as boolean,
        bookmarked: "NO",
        termSource: "",
        wrongChoices: [],
      }));
      
      setQuizReviewList(updatedQuizReviewList);
      console.log("res : ", res);
      console.log("quizReviewLocalList : ", quizReviewLocalList);
      console.log("updatedQuizReviewList", updatedQuizReviewList);
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
        {quizReviewLocalList.map((item, idx) => (
          <QuizReviewRouter
            key={idx}
            id={item.termId}
            answer={item.isAnswerRight}
            wordAnswer={item.termName}
            userAnswer={item.wrongChoices[0]}
            onPress={() =>
              navigation.navigate("QuizReviewDetail", { id: item.termId })
            }
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
