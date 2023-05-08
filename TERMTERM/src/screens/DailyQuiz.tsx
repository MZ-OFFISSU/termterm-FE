import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { colorTheme, TEXT_STYLE_SIZE, TEXT_STYLE_WEIGHT } from "@style/designSystem";
import { SafeAreaView } from "react-native-safe-area-context";
import QuizCard from "@components/quiz/QuizCard";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { BackBar } from "@components/header";
import { dummyWord, dummyWords } from "@assets/dummyWord";
import QuizButton from "@components/quiz/QuizButton";
import { useWordReg } from "@hooks/useWordReg";
import WordCard from "@components/terms/WordCard";

export type Props = StackScreenProps<RootStackParamList, "DailyQuiz">;

const DailyQuiz = ({ navigation }: Props) => {
  const [idx, setIdx] = useState(0);
  /** 테마에 따른 디자인 상태 변수 */
  const [COLOR, mode] = useThemeStyle();
  /** 데일리 퀴즈 / 리뷰 퀴즈 상태 변수 */
  const [quizType, setQuizType] = useState<'daily' | 'review'>('daily');
  /** 클릭된 버튼의 인덱스 */
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
  const [words, setWords] = useState(dummyWords);
  /** 퀴즈의 답이 체크 되었는지 & 체크되지 않았는지를 체크하는 변수 */
  const [quizState, setQuizState] = useState<'question' | 'answer'>('question');

  // TODO : 버튼 클릭 시 실행되는 함수 디버깅
  const handlePress = () => {
    if (selectedButtonIndex !== null) {
      const isCorrect = words[idx].name === useWordReg(words[idx].name)[0];
      if (isCorrect) {
        setIdx(idx + 1);
        setSelectedButtonIndex(null);
        setQuizState('question');
      }
    }
  };

  /** 버튼 내부 텍스트 변경 */
  const getButtonText = (index: number) => {
    const [sub, main] = useWordReg(words[idx].name);
    if (index === 1) {
      return main;
    } else {
      // TODO : 정답이 아닌 다른 값 랜덤으로 가져오는 기능 추가
      return `NOT ANSWER`;
    }
  };

  useEffect(() => {
    if (selectedButtonIndex !== null) {
      setQuizState('answer');
      // handlePress();
    }
  }, [selectedButtonIndex]);

  return (
    <SafeAreaView style={{ marginTop: "-15%" }}>
      <BackBar title={`${idx + 1}/${words.length}`} onBack={() => navigation.pop()} />
      <Container COLOR={COLOR}>
        {quizState === 'question' ? (
          <>
            <InnerContainer>
            <Title COLOR={COLOR} mode={mode}>
              어떤&nbsp;
              <Title 
                COLOR={COLOR} 
                mode={mode} 
                style={{ fontWeight: "900" }}
              >용어</Title>에 대한 설명일까요?
            </Title>
              <QuizCard explain={words[idx].description} quiz={true} />
              <ButtonContainer>
                {Array.from({ length: 3 }, (_, index) => (
                  <QuizButton
                    key={index}
                    active={selectedButtonIndex === index}
                    onPress={() => setSelectedButtonIndex(index)}
                  >
                    <ButtonText COLOR={COLOR} mode={mode}>
                      {getButtonText(index)} {index} {selectedButtonIndex === index ? 'true' : 'false'} {selectedButtonIndex}
                    </ButtonText>
                  </QuizButton>
                ))}
              </ButtonContainer>
            </InnerContainer>
          </>
        ) : (
          <>
            <InnerContainer>
              <WordCard word={dummyWord} quiz={true} />
              <ButtonContainer>
                {/* TODO : 이 부분 디버깅 빨리!!!! */}
                {Array.from({ length: 3 }, (_, index) => (
                <QuizButton
                  key={index}
                  active={selectedButtonIndex === index}
                  onPress={() => setSelectedButtonIndex(index)}
                >
                  <ButtonText COLOR={COLOR} mode={mode}>{getButtonText(index)}</ButtonText>
                </QuizButton>
                ))}
                <ConfirmButton COLOR={COLOR} mode={mode} onPress={() => setIdx(idx + 1)}>
                  <ConfirmText COLOR={COLOR} mode={mode}>확인</ConfirmText>
                </ConfirmButton>
              </ButtonContainer>
            </InnerContainer>
          </>
        )}
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

const ConfirmButton = styled.TouchableOpacity<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  width: 100%;
  height: 47px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => 
    props.mode 
      ? props.COLOR.Neutral[100]
      : props.COLOR.THEME.secondary[120]}
`;

const ConfirmText = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  font-size: ${TEXT_STYLE_SIZE.md2}px;
  font-weight: ${TEXT_STYLE_WEIGHT.Sb};
  color: ${(props) => props.mode 
    ? props.COLOR.Text.lighten 
    : props.COLOR.Text.darken}
`;

export default DailyQuiz;