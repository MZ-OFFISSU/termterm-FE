import styled from "styled-components/native";
import { useState, useEffect } from "react";
import { screenWidth } from "@style/dimensions";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBar } from "@components/header";
import { colorTheme, LIGHT_COLOR_STYLE, TYPO_STYLE } from "@style/designSystem";
import { useThemeStyle } from "@hooks/useThemeStyle";

export type Props = StackScreenProps<RootStackParamList, "CompleteQuiz">;

const CompleteQuiz = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [width, setWidth] = useState(112);
  const [score, setScore] = useState(200);

  /** 아이콘 너비 계산 함수 */
  const calcWidth = () => {
    if (screenWidth < 390) return;
    if (screenWidth < 435) {
      setWidth(147);
      return;
    }
    if (screenWidth < 500) {
      setWidth(172);
      return;
    }
    if (screenWidth > 500) {
      setWidth(212);
      return;
    }
  };

  useEffect(() => {
    calcWidth();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <Container>
        <BackBar title="Daily 용어 퀴즈 완료" onBack={() => navigation.pop()} />
        <ContentWrapper>
          <AutoSizedImage
            source={require("@assets/complete-quiz.png")}
            width={width}
            style={{ marginTop: 70 }}
          />
          <TitleBox>
            <Title>Daily 용어 퀴즈 완료 🎉</Title>
            <SubTitle COLOR={COLOR} mode={mode}>
              Daily 용어 퀴즈를 모두 맞춰
            </SubTitle>
            <SubTitle COLOR={COLOR} mode={mode}>
              <BoldSub COLOR={COLOR} mode={mode}>{score}포인트</BoldSub>를 얻었어요!
            </SubTitle>
            <SubTitle COLOR={COLOR} mode={mode}>
              내일도 Daily 용어 퀴즈를 응시해보세요.
            </SubTitle>
          </TitleBox>
          <CompleteButton COLOR={COLOR} mode={mode} onPress={() => navigation.navigate("Home")}>
            <ButtonText>{`홈으로 돌아가기    〉`}</ButtonText>
          </CompleteButton>
        </ContentWrapper>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  width: 100%;
  height: 100%;
  margin: 5px;
`;

const ContentWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px 20px 50px 20px;
`;

const TitleBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: 900;
  color: #0d0d0d;
  opacity: 0.95;
  margin-bottom: 20px;
`;

const SubTitle = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  ${TYPO_STYLE.Body[2].Regular};
  color: ${(props) => props.COLOR.Text.default};
  margin-top: 5px;
  text-align: center;
`;

const BoldSub = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  ${TYPO_STYLE.Body[2].Bold};
  color: ${(props) => props.COLOR.Text.default};
  margin-top: 5px;
  text-align: center;
`;

const CompleteButton = styled.TouchableOpacity<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  width: 318px;
  height: 44px;
  z-index: 2;
  background-color: ${(props) => props.COLOR.Neutral[100]};
  border-radius: 50%;
  margin-top: 40px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin: auto 0;
  color: ${LIGHT_COLOR_STYLE.Text.lighten};
`;

export default CompleteQuiz;
