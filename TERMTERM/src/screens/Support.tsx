import styled from "styled-components/native";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { View, Keyboard, Text, TextInput } from "react-native";
import { First, Second, Third } from "./Support/index";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useState } from "react";
import { screenWidth } from "@style/dimensions";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { NavigationBar, NavigatorTitle, CaretBtn } from "@components/index";
import { AntDesign } from "@expo/vector-icons";

export type Props = StackScreenProps<RootStackParamList, "Support">;

const STAGES = [First, Second, Third] as const;

const Support = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [stage, setStage] = useState(0);
  const CurrentPage = STAGES[stage];

  const onEnd = () => {
    stage < STAGES.length - 1 ? setStage((prev) => prev + 1) : null;
  };

  return (
      <Container>
        <InnerContainer>
          <Contents>
            <CurrentPage onEnd={() => onEnd()} />
          </Contents>
        </InnerContainer>
      </Container>
  );
};

const Container = styled.View`
  width: 100%;
  background-color: ${LIGHT_COLOR_STYLE.Background.surface};
`;

const InnerContainer = styled.View`
  width: 100%;
  display: flex;
  background-color: ${LIGHT_COLOR_STYLE.Background.surface};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Contents = styled.View`
  width: ${screenWidth - 64}px;
`;

export default Support;
