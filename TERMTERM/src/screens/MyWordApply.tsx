import styled from "styled-components/native";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { colorTheme } from "@style/designSystem";
import { useState } from "react";
import { InputApply, StandardApply } from "@components/apply";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { StackScreenProps } from "@react-navigation/stack";
import Toast from "react-native-toast-message";

type Props = StackScreenProps<RootStackParamList, "MyWordApply">;

const COMPONENTS = [StandardApply, InputApply];

/**
 * 내 포인트 스크린
 */
const MyWordApply = ({ navigation, route }: Props) => {
  const [COLOR, mode] = useThemeStyle();
  const [curIdx, setCurIdx] = useState(0);

  const CurComponent = COMPONENTS[curIdx];

  //토스트메시지 보여주는 함수
  const showToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1: "신청이 완료되었어요!\n검토 후 승인여부를 알려드릴게요!",
    });
  };

  const nextStage = () => {
    if (curIdx < COMPONENTS.length - 1) setCurIdx((prev) => prev + 1);
    else {
      showToast();
      navigation.pop();
    }
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
