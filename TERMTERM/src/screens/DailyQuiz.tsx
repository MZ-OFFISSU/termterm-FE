import styled from "styled-components/native";
import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { SafeAreaView } from "react-native-safe-area-context";
import { DailyQuizItemProps } from "@interfaces/dailyquiz";
import QuizCard from "@components/quiz/QuizCard";
import { useThemeStyle } from "@hooks/useThemeStyle";
import useHideWord from "@hooks/useHideWord";
import { screenWidth } from "@style/dimensions";

export type Props = StackScreenProps<RootStackParamList, "DailyQuiz">;

const DailyQuiz = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [idx, setIdx] = useState(0);
  const [isSelect, setSelect] = useState({
    id1: false,
    id2: false,
    id3: false,
  });
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [borderColor, setBorderColor] = useState(
    COLOR.Background.inputBorderDefault
  );

  const { hiddenExplain } = useHideWord(dummy[idx].explain, dummy[idx].word);
  const handleButton = (idx: number) => {
    setSelectedIdx(idx);
    setBorderColor(COLOR.THEME.secondary[120]);
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
        <QuizCard explain={hiddenExplain} />
        {dummy.map((item, idx) => (
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
            onPress={() => handleButton(idx)}
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

const dummy: Array<DailyQuizItemProps> = [
  {
    word: "가독성",
    explain:
      "보여지는 페이지 위에 하나의 레이어를 더 얹히고 보여주는 작은 창을 의미해요. 모달은 팝업창, 다이올로그 창과 혼용되어 사용되기도 하는데 엄밀히 따지면 모달은 보여지는 페이지 위에 하나의 레이어를 더 얹히고 보여주는 작은 창이고 팝업은 열려 있는 페이지에 또 다른 페이지(작은 창)을 띄우는 것이라 구분되지만 거의 하나처럼 이야기되는 경우가 종종 있어요.",
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
