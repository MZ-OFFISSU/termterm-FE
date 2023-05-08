import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { LIGHT_COLOR_STYLE, colorTheme } from "@style/designSystem";
import { SafeAreaView } from "react-native-safe-area-context";
import { DailyQuizItemProps } from "@interfaces/dailyquiz";
import QuizCard from "@components/quiz/QuizCard";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { BackBar } from "@components/header";
import { dummyWord, dummyWords } from "@assets/dummyWord";
import QuizButton from "@components/quiz/QuizButton";
import { useWordReg } from "@hooks/useWordReg";

export type Props = StackScreenProps<RootStackParamList, "DailyQuiz">;

const DailyQuiz = ({ navigation }: Props) => {
  const [idx, setIdx] = useState(0);
  const [COLOR, mode] = useThemeStyle();
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
  const [words, setWords] = useState(dummyWords);

  const handlePress = () => {
    if (selectedButtonIndex !== null) {
      const isCorrect = words[idx].name === useWordReg(words[idx].name)[1];
      if (isCorrect) {
        setIdx(idx + 1);
        if (idx < words.length - 1) {
          setSelectedButtonIndex(selectedButtonIndex + 1);
        }
      }
    }
  };

  const getButtonText = (index: number) => {
    const [sub, main] = useWordReg(words[idx].name);
    if (index === 1) {
      return main || "바보";
    } else {
      // TODO : 정답이 아닌 다른 값 랜덤으로 가져오는 기능 추가
      return sub ? `Not ${main}` : `Button ${index}`;
    }
  };

  useEffect(() => {
    handlePress();
  }, [selectedButtonIndex]);
  

  return (
    <SafeAreaView style={{ marginTop: "-15%" }}>
      <BackBar title={`${idx + 1}/5`} onBack={() => navigation.pop()} />
      <Container COLOR={COLOR}>
        <Title COLOR={COLOR} mode={mode}>
          어떤&nbsp;
          <Title 
            COLOR={COLOR} 
            mode={mode} 
            style={{ fontWeight: "900" }}
          >용어</Title>에 대한 설명일까요?
        </Title>
        <InnerContainer>
          <QuizCard explain={words[idx].description} quiz={true} />
          <ButtonContainer>
            {Array.from({ length: 3 }, (_, index) => (
              <QuizButton
                key={index}
                active={selectedButtonIndex === index}
                onPress={() => setSelectedButtonIndex(index)}
              >
                <ButtonText COLOR={COLOR} mode={mode}>{getButtonText(index)}</ButtonText>
              </QuizButton>
            ))}
          </ButtonContainer>
        </InnerContainer>
      </Container>
    </SafeAreaView>
  )
};

const Container = styled.ScrollView<{ COLOR: colorTheme}>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

const InnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px 16px;
`;

const Title = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  font-size: 23px;
  font-weight: 400;
  color: ${(props) =>
    props.mode
    ? props.COLOR.Text.darken
    : props.COLOR.Text.lighten
  };
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const ButtonText = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  color: ${(props) => props.COLOR.Text.active};
  font-size: 15px;
  text-align: center;
  margin: auto 0;
`;

export default DailyQuiz;