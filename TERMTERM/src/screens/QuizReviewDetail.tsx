import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { colorTheme } from "@style/designSystem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { WordProps } from "@interfaces/word";
import {
  CustomButton,
  BUTTON_STATE,
  BUTTON_TYPE,
  AnswerReminder,
} from "@components/index";
import QuizAnswerCard from "@components/terms/QuizAnswerCard";
import { eachQuizAnswerResult, quizState } from "@recoil/quizState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigation } from "@react-navigation/native";
import { QuizAnswerResult, QuizReviewDetail } from "Quiz";

// export type Props = StackScreenProps<RootStackParamList, "QuizResult">;
export type Props = {
  route: {
    params: {
      id: number;
      item: QuizReviewDetail;
    };
  };
};

const QuizReViewDetail = ({ route }: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [COLOR, mode] = useThemeStyle();
  const [answer, setAnswer] = useState<WordProps>();
  const curr = useRecoilValue(quizState);
  const { currIdx } = curr;
  const quizResult = useRecoilValue(eachQuizAnswerResult);
  const answerCardWord: QuizAnswerResult = {
    termId: route.params.item.termId,
    termName: route.params.item.termName,
    termDescription: route.params.item.termDescription,
    memberSelectedTermName: route.params.item.wrongChoices[0],
    isAnswerRight: route.params.item.isAnswerRight,
    statusCode: 200
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLOR.Background.surface }}>
      <Container COLOR={COLOR} mode={mode}>
        <AnswerReminder
          answer={route.params.item.isAnswerRight}
          userAnswer={route.params.item.wrongChoices[0]}
        />
        <ContentWrapper>
          <QuizAnswerCard
            word={answerCardWord}
            quiz={true}
            style={{ marginTop: "-15%" }}
          />
        </ContentWrapper>
        <CustomButton
          title={"확인"}
          theme={mode}
          type={mode ? BUTTON_TYPE.primary : BUTTON_TYPE.secondary}
          state={BUTTON_STATE.active}
          onPress={() => navigation.navigate("QuizReview")}
          style={{ width: "90%", alignSelf: "center", marginTop: "7%" }}
        />
      </Container>
    </SafeAreaView>
  );
};

export default QuizReViewDetail;

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
