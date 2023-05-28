import styled from "styled-components/native";
import { TouchableOpacityProps, ImageSourcePropType } from "react-native";
import { colorTheme, TEXT_STYLES } from "@style/designSystem";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useThemeStyle } from "@hooks/useThemeStyle";

export type ScreenProps = StackScreenProps<RootStackParamList, "ToolBar">;

interface Props extends TouchableOpacityProps {
  title: string;
  img: ImageSourcePropType;
  isFocused: boolean;
}

const DailyQuizRouter = ({ navigation }: ScreenProps) => {
  const [COLOR, mode] = useThemeStyle();
  return (
    <Container COLOR={COLOR} mode={mode}>
      <LeftBox>
        <AutoSizedImage source={require("@assets/test.png")} width={24} />
        <Title COLOR={COLOR} style={{ marginLeft: 5 }}>
          Daily 용어 퀴즈를 시작해 볼까요?
        </Title>
      </LeftBox>
      <TouchableOpacity onPress={() => navigation.navigate("DailyQuiz")}>
        <AutoSizedImage
          source={require("@assets/arrow-button.png")}
          width={40}
        />
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View<{ COLOR: colorTheme; mode: boolean }>`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  background-color: ${(props) =>
    props.mode
      ? props.COLOR.THEME.secondary[20]
      : props.COLOR.Background.onSurface};
  margin-top: 10px;
`;

const LeftBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text<{ COLOR: colorTheme }>`
  font-size: ${TEXT_STYLES.md2.Md?.fontSize}px;
  font-weight: 500;
  color: ${(props) => props.COLOR.Text.active};
  text-align: center;
`;

export default DailyQuizRouter;
