import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { WordCard } from "@components/terms/";
import { useEffect, useState } from "react";
import { WordProps } from "@interfaces/word";
import { dummyWord } from "@assets/dummyWord";
import { screenWidth } from "@style/dimensions";
import OtherThink from "@components/OtherThink";
import LottieAnimation from "@components/OtherThink/LottieAnimation";
import { useTerm } from "@hooks/useTerm";

export type Props = StackScreenProps<RootStackParamList, "TermDetail">;

/**
 * 단일 용어 설명 페이지
 */
const TermDetail = ({ navigation, route }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const { getTermDetail, termDetail } = useTerm();

  useEffect(() => {
    getTermDetail(route.params.id);
  }, [route]);

  return (
    <Container COLOR={COLOR}>
      {termDetail ? (
        <>
          <WordCard
            word={termDetail}
            detail={true}
            style={{ width: screenWidth - 32 }}
          />
          {/* <LottieAnimation /> */}
          <OtherThink word={termDetail} />
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

export default TermDetail;
