import AutoSizedImage from "@components/common/AutoSizedImage";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackScreenProps } from "@react-navigation/stack";
import { colorTheme, TEXT_STYLES, TYPO_STYLE } from "@style/designSystem";
import { screenWidth } from "@style/dimensions";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export type Props = StackScreenProps<RootStackParamList, "QuizIntro">;

const QuizIntro = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [width, setWidth] = useState(117);

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
      <Container COLOR={COLOR} mode={mode}>
        <ContentWrapper>
          <AutoSizedImage
            source={require("@assets/termtermlogo-yellow.png")}
            width={width}
            style={{ marginTop: 80 }}
          />
          <TitleBox>
            <Title COLOR={COLOR} mode={mode}>
              Daily 용어 퀴즈
            </Title>
            <SubTitle
              COLOR={COLOR}
              mode={mode}
            >{`Daily 용어 퀴즈로 용어를 학습하고\n포인트까지 얻어보세요!`}</SubTitle>
          </TitleBox>
          <Button
            COLOR={COLOR}
            mode={mode}
            onPress={() => navigation.navigate("DailyQuiz")}
          >
            <ButtonText COLOR={COLOR} mode={mode}>
              {`퀴즈 응시하기     >`}
            </ButtonText>
          </Button>
        </ContentWrapper>
      </Container>
    </SafeAreaView>
  );
};

export default QuizIntro;

const Container = styled.View<{
  COLOR: colorTheme;
  mode: boolean;
}>`
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
  padding: 50px 20px;
`;

const TitleBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const Title = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  ${TYPO_STYLE.Heading[2].Bold};
  color: ${(props) => props.COLOR.Text.active};
  margin-top: 40px;
`;

const SubTitle = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  ${TYPO_STYLE.Body[1].Medium};
  color: ${(props) => props.COLOR.Text.default};
  margin-top: 20px;
  text-align: center;
`;

const Button = styled.TouchableOpacity<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  width: 318px;
  height: 44px;
  border-radius: 30px;
  background-color: ${(props) => props.COLOR.Neutral[100]};
  margin-top: 80px;
`;

const ButtonText = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  ${TYPO_STYLE.Body[2].SemiBold};
  color: ${(props) => props.COLOR.Text.lighten};
  font-size: 15px;
  text-align: center;
  margin: auto 0;
`;
