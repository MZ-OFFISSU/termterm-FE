import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { SafeAreaView } from "react-native-safe-area-context";
import QuizCard from "@components/quiz/QuizCard";
import { useThemeStyle } from "@hooks/useThemeStyle";
import useHideWord from "@hooks/useHideWord";
import { screenWidth } from "@style/dimensions";
import { useQuiz } from "@hooks/useQuiz";
import { useRecoilState } from "recoil";
import { quizState } from "@recoil/quizState";
import { QuizSubmit } from "Quiz";

export type Props = StackScreenProps<RootStackParamList, "DailyQuiz">;

const DailyQuiz = ({ navigation }: Props) => {
  const { dailyQuizItem, registerQuizResultInfo } = useQuiz();
  const [COLOR, mode] = useThemeStyle();
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [borderColor, setBorderColor] = useState(
    COLOR.Background.inputBorderDefault
  );
  const [curr, setCurr] = useRecoilState(quizState);
  const currentQuiz = dailyQuizItem?.[curr.currIdx - 1];

  // TODO : DB에 @@ 포함되어 용어 설명 들어가면 다시 훅 사용
  // const { hiddenExplain } = useHideWord(dummy[idx].explain, dummy[idx].word);
  const handleButton = (idx: number) => {
    setSelectedIdx(idx);
    setBorderColor(COLOR.THEME.secondary[120]);
    setCurr((prev) => ({ ...prev, currIdx: prev.currIdx + 1 }));
    const memberQuizSelect: QuizSubmit = {
      quizType: "DAILY",
      results: [
        ...(curr.currIdx <= 5
          ? [
              {
                memberSelectedTermId: idx,
                problemTermId: currentQuiz?.termId || 0,
              },
            ]
          : []),
      ],
    };

    console.log(memberQuizSelect);
    registerQuizResultInfo(memberQuizSelect);
    navigation.navigate("QuizResult", { id: idx });
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLOR.Background.surface }}>
      <Container>
        <Title COLOR={COLOR} mode={mode}>
          어떤{" "}
          <BoldTitle COLOR={COLOR} mode={mode}>
            용어
          </BoldTitle>
          에 대한 설명일까요?
        </Title>
        <QuizCard explain={currentQuiz?.termDescription} />
        {currentQuiz?.options.map((item, idx) => (
          <QuizButton
            key={idx}
            COLOR={COLOR}
            mode={mode}
            borderColor={
              idx === selectedIdx
                ? COLOR.THEME.secondary[120]
                : COLOR.Background.inputBorderDefault
            }
            underlayColor={COLOR.THEME.secondary[70]}
            onPress={() => handleButton(item.termId)}
          >
            <ButtonText COLOR={COLOR} mode={mode}>
              {item.optionName}
            </ButtonText>
          </QuizButton>
        ))}
      </Container>
    </SafeAreaView>
  );
};

export default DailyQuiz;

const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Title = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  ${TYPO_STYLE.Heading[3].Medium};
  color: ${(props) => props.COLOR.Text.active};
  text-align: center;
  margin: 40px auto;
`;

const BoldTitle = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  ${TYPO_STYLE.Heading[3].ExtraBold};
  color: ${(props) => props.COLOR.Text.active};
  text-align: center;
  margin: 40px auto;
`;

const QuizButton = styled.TouchableHighlight<{
  COLOR: colorTheme;
  mode: boolean;
  borderColor: string;
}>`
  width: ${screenWidth - 32}px;
  height: 47px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.borderColor};
  margin: 10px auto;
`;

const ButtonText = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  color: ${(props) => props.COLOR.Text.active};
  ${TYPO_STYLE.Body[2].SemiBold};
  text-align: center;
  margin: auto 0;
`;
