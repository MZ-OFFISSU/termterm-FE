import styled from "styled-components/native";
import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { SafeAreaView } from "react-native-safe-area-context";
import { DailyQuizItemProps } from "@interfaces/dailyquiz";
import QuizCard from "@components/quiz/QuizCard";
import { BackBar } from "@components/header";
import { useThemeStyle } from "@hooks/useThemeStyle";
import useHideWord from "@hooks/useHideWord";

export type Props = StackScreenProps<RootStackParamList, "DailyQuiz">;

const DailyQuiz = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [idx, setIdx] = useState(0);
  const [isSelect, setSelect] = useState({
    id1: false,
    id2: false,
    id3: false,
  });

  const { hiddenExplain } = useHideWord(dummy[idx].explain, dummy[idx].word);

  return (
    <SafeAreaView style={{ backgroundColor: COLOR.Background.surface }}>
      <Container>
        <BackBar title={`${idx + 1}/5`} onBack={() => navigation.pop()} />
        <Title COLOR={COLOR} mode={mode}>
          어떤{" "}
          <BoldTitle COLOR={COLOR} mode={mode}>
            용어
          </BoldTitle>
          에 대한 설명일까요?
        </Title>
        <QuizCard explain={hiddenExplain} />
        {dummy.map((item, idx) => (
          <QuizButton
            key={idx}
            COLOR={COLOR}
            mode={mode}
            underlayColor={COLOR.THEME.secondary[70]}
            onPress={() => navigation.navigate("QuizResult")}
          >
            <ButtonText COLOR={COLOR} mode={mode}>
              {item.word}
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
}>`
  width: 358px;
  height: 47px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: lightgray;
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

const dummy: Array<DailyQuizItemProps> = [
  {
    word: "가독성",
    explain:
      "얼마나 쉽게 읽을 수 있는지를 나타내는 정도를 뜻하는 말이에요. 프로그래밍에서의 가독성은 소스코드를 보고 코드가 의도하는 동작이나 알고리즘을 얼마나 쉽게 이해할 수 있는지를 뜻해요.",
  },
  {
    word: "Stakeholder",
    explain:
      "지폐나 동전과 같은 실물이 없이 네트워크로 연결된 특정한 가상공간(vitual community)에서 전자적 형태로 사용되는 디지털 화폐 또는 전자화폐를 말해요.",
  },
  {
    word: "Product Manager",
    explain:
      "얼마나 쉽게 읽을 수 있는지를 나타내는 정도를 뜻하는 말이에요. 프로그래밍에서의 가독성은 소스코드를 보고 코드가 의도하는 동작이나 알고리즘을 얼마나 쉽게 이해할 수 있는지를 뜻해요.",
  },
];
