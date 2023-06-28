import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import { useState } from "react";
import { InputApply, StandardApply } from "@components/apply";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<RootStackParamList, "MyWordApply">;

const COMPONENTS = [StandardApply, InputApply];

/**
 * 내 포인트 스크린
 */
const MyWordApply = ({ navigation, route }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [curIdx, setCurIdx] = useState(0);

  const CurComponent = COMPONENTS[curIdx];

  const nextStage = () => {
    if (curIdx < COMPONENTS.length - 1) setCurIdx((prev) => prev + 1);
  };

  return (
    <Container COLOR={COLOR}>
      <CurComponent nextStage={nextStage} />
    </Container>
  );
};

const Container = styled.ScrollView<{ COLOR: colorTheme }>`
  width: 100%;
  background-color: ${(props) => props.COLOR.Background.surface};
`;

export default MyWordApply;
