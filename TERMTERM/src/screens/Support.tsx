import styled from "styled-components/native";
import { colorTheme, LIGHT_COLOR_STYLE } from "@style/designSystem";
import { First, Second, Third } from "./Support/index";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useState } from "react";
import { screenWidth } from "@style/dimensions";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useSafeColor } from "@hooks/useSafeColor";

export type Props = StackScreenProps<RootStackParamList, "Support">;

const STAGES = [First, Second, Third] as const;

const Support = ({ navigation }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [stage, setStage] = useState(0);
  const CurrentPage = STAGES[stage];
  useSafeColor();

  const onEnd = () => {
    stage < STAGES.length - 1 ? setStage((prev) => prev + 1) : null;
  };

  return (
    <Wrapper COLOR={COLOR} mode={mode}>
      <Contents COLOR={COLOR} mode={mode}>
        <CurrentPage onEnd={onEnd} />
      </Contents>
    </Wrapper>
  );
};

const Wrapper = styled.ScrollView<{ COLOR: colorTheme; mode: boolean }>`
  display: flex;
  background-color: ${(props) => props.COLOR.Background.surface};
  position: relative;
`;

const Contents = styled.View<{ COLOR: colorTheme; mode: boolean }>`
  width: ${screenWidth}px;
  height: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

export default Support;
