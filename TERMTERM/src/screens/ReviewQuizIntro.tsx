import AutoSizedImage from "@components/common/AutoSizedImage";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackScreenProps } from "@react-navigation/stack";
import { colorTheme, TYPO_STYLE } from "@style/designSystem";
import { screenWidth } from "@style/dimensions";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Fontisto } from "@expo/vector-icons";

export type Props = StackScreenProps<RootStackParamList, "ReviewQuizIntro">;

const ReviewQuizIntro = ({ navigation }: Props) => {
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
    <SafeAreaView style={{ backgroundColor: COLOR.Background.surface }}>
      <Container COLOR={COLOR} mode={mode}>
        <ContentWrapper>
          <AutoSizedImage
            source={require("@assets/termtermlogo-yellow.png")}
            width={width}
            style={{ marginTop: 80 }}
          />
          <TitleBox>
            <Title COLOR={COLOR} mode={mode}>
              용어 복습 퀴즈
            </Title>
            <SubTitle COLOR={COLOR} mode={mode}>
              {`용어 복습 퀴즈로 틀렸던 문제를\n다시 풀며 학습해보세요!`}
            </SubTitle>
          </TitleBox>
          <Button
            COLOR={COLOR}
            mode={mode}
            onPress={() => navigation.navigate("ReviewQuiz")}
          >
            <ButtonText COLOR={COLOR} mode={mode}>
              {`퀴즈 응시하기     `}
              <Fontisto
                name="angle-right"
                size={15}
                color={COLOR.Text.lighten}
                style={{ marginLeft: 40 }}
              />
            </ButtonText>
          </Button>
        </ContentWrapper>
      </Container>
    </SafeAreaView>
  );
};

export default ReviewQuizIntro;

const Container = styled.View<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  width: 100%;
  height: 100%;
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
  line-height: 27px;
  text-align: center;
`;

const Button = styled.TouchableOpacity<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  width: ${screenWidth - 32}px;
  height: 44px;
  border-radius: 30px;
  background-color: ${(props) =>
    props.mode ? props.COLOR.Neutral[100] : props.COLOR.Background.onSurface};
  margin-top: 80px;
`;

const ButtonText = styled.Text<{
  COLOR: colorTheme;
  mode: boolean;
}>`
  ${TYPO_STYLE.Body[2].SemiBold};
  color: ${(props) => props.COLOR.Text.lighten};
  text-align: center;
  margin: auto 0;
`;
