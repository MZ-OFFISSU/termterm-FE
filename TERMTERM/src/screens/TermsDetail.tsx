import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { WordCarousel } from "@components/terms/";
import { useEffect, useState } from "react";
import { WordProps } from "@interfaces/word";
import OtherThink from "@components/OtherThink";
import LottieAnimation from "@components/OtherThink/LottieAnimation";
import { useHeader } from "@hooks/useHeader";
import { dummyWords } from "@assets/dummyWord";

export type Props = StackScreenProps<RootStackParamList, "TermsDetail">;

/**
 * 여러 용어 설명 페이지
 */
const TermsDetail = ({ navigation, route }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [words, setWords] = useState<Array<WordProps>>();
  const [curIdx, setCurIdx] = useState(0);

  const { setHeaderState, settingIdx } = useHeader();

  const settingHeader = (words: Array<WordProps>) => {
    const defaultHeaderState = {
      id: route.params.id,
      maxNum: words.length,
      curNum: curIdx + 1,
      bookmarked: words[curIdx].bookmarked ? true : false,
    };
    setHeaderState(defaultHeaderState);
  };

  const snap = (idx: number) => {
    setCurIdx(idx);
    settingIdx(idx);
  };

  useEffect(() => {
    //TODO : 큐레이션 속 용어 아이디로 용어 상세 받아오기
    setWords(dummyWords);
    settingHeader(dummyWords);
  }, [route]);

  return (
    <Container COLOR={COLOR}>
      {words ? (
        <>
          <WordCarousel
            words={words}
            dots={false}
            snap={snap}
            touchable={false}
          />
          <LottieAnimation />
          <OtherThink word={words[curIdx]} />
        </>
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
  padding: 20px 0px 100px 0px;
`;

export default TermsDetail;
