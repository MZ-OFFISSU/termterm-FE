import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { WordCard } from "@components/terms/";
import { useEffect, useState } from "react";
import { WordProps } from "@interfaces/word";
import { dummyWord } from "@assets/dummyWord";
import { screenWidth } from "@style/dimensions";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

type Params = {
  id: number;
};

/**
 * 단일 용어 설명 페이지
 */
const TermDetail = () => {
  const [COLOR, mode] = useThemeStyle();
  const [word, setWord] = useState<WordProps>();
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    //TODO : 아이디로 해당 용어 정보 받아오는 함수 추가

    setWord(dummyWord);
  }, [route]);

  return (
    <Container COLOR={COLOR}>
      {word ? (
        <WordCard word={word} style={{ width: screenWidth - 32 }} />
      ) : (
        <></>
      )}
    </Container>
  );
};

const Container = styled.View<{ COLOR: colorTheme }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.COLOR.Background.surface};
  padding: 20px 0px;
`;

export default TermDetail;