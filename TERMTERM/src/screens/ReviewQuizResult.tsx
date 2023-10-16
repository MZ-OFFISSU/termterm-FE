import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { colorTheme } from "@style/designSystem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { WordProps } from "@interfaces/word";
import { dummyWord } from "@assets/dummyWord";
import {
  CustomButton,
  BUTTON_STATE,
  BUTTON_TYPE,
  AnswerReminder,
} from "@components/index";
import QuizAnswerCard from "@components/terms/QuizAnswerCard";
import { eachQuizAnswerResult, quizState } from "@recoil/quizState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { logGAevent } from "@utils/analytics";

export type Props = StackScreenProps<RootStackParamList, "ReviewQuizResult">;

const ReviewQuizResult = ({ navigation, route }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [answer, setAnswer] = useState<WordProps>();
  const curr = useRecoilValue(quizState);
  const { currIdx, currReviewIdx, totalReviewIdx } = curr;
  const quizResult = useRecoilValue(eachQuizAnswerResult);
  const setCurrReviewIdx = useSetRecoilState(quizState);

  const handleCompleteButton = () => {
    setCurrReviewIdx((prev) => ({ ...prev, currReviewIdx: 0 }));
    logGAevent("review_quiz_complete", {
      status_code: quizResult.statusCode,
    });
    navigation.navigate("CompleteQuiz", { id: quizResult.statusCode });
  };

  const handleReviewButton = () => {
    setCurrReviewIdx((prev) => ({
      ...prev,
      currReviewIdx: curr.currReviewIdx,
    }));
    navigation.navigate("ReviewQuiz");
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLOR.Background.surface }}>
      <Container COLOR={COLOR} mode={mode}>
        <AnswerReminder
          answer={quizResult.isAnswerRight}
          userAnswer={quizResult.memberSelectedTermName}
        />
        <ContentWrapper>
          <QuizAnswerCard
            word={quizResult}
            quiz={true}
            style={{ marginTop: "-15%" }}
          />
        </ContentWrapper>
        <CustomButton
          title={"확인"}
          theme={mode}
          type={mode ? BUTTON_TYPE.primary : BUTTON_TYPE.secondary}
          state={BUTTON_STATE.active}
          onPress={() =>
            currReviewIdx === totalReviewIdx
              ? handleCompleteButton()
              : handleReviewButton()
          }
          style={{ width: "90%", alignSelf: "center", marginTop: "7%" }}
        />
      </Container>
    </SafeAreaView>
  );
};

export default ReviewQuizResult;

const Container = styled.View<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
`;
