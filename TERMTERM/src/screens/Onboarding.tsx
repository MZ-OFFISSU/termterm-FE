import styled from "styled-components/native";
import { LIGHT_COLOR_STYLE } from "@style/designSystem";
import { First, Second, Third } from "./Onboarding/index";
import {
  NavigationBar,
  NavigatorTitle,
  NavigatorPager,
  CaretBtn,
} from "@components/index";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useState } from "react";
import { screenWidth } from "@style/dimensions";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

export type Props = StackScreenProps<RootStackParamList, "Onboarding">;

const STAGES = [First, Second, Third] as const;

const Onboarding = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [stage, setStage] = useState(0);
  const CurrentPage = STAGES[stage];

  const onEnd = () => {
    stage < STAGES.length - 1 ? setStage((prev) => prev + 1) : null;
  };

  return (
    <SafeAreaView
      style={{ flex: 0, backgroundColor: COLOR.Background.surface }}
    >
      <Wrapper>
        <NavigationBar
          style={{
            paddingLeft: 17,
            paddingRight: 17,
            justifyContent: "space-between",
          }}
        >
          <CaretBtn onPress={() => navigation.pop()}>
            <AntDesign name="left" size={20} color={COLOR.Text.active} />
          </CaretBtn>
          <NavigatorTitle style={{ color: COLOR.Text.active }}>
            회원가입
          </NavigatorTitle>
          <NavigatorPager style={{ color: COLOR.Text.active }} COLOR={COLOR}>
            {stage + 1} / 3
          </NavigatorPager>
        </NavigationBar>
        <Contents>
          <CurrentPage onEnd={() => onEnd()} />
        </Contents>
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${LIGHT_COLOR_STYLE.Background.surface};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const Contents = styled.View`
  height: 100%;
  width: ${screenWidth - 64}px;
`;

export default Onboarding;
