import styled from "styled-components/native";
import { colorTheme } from "@style/designSystem";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isTimeExpired } from "@utils/timeCheck";
import { Start, Clear, Fail } from "./Types";

const STAGES = [Start, Clear, Fail];

/**
 * async storage에 저장되는 퀴즈 현재 상태
 */
enum QuizState {
  /** 시작하지 않은 상테 */
  NOT_STARTED = "NOT_STARTED",
  /** 모두 정답인 상태 */
  COMPLETED = "COMPLETED",
  /** 오답이 있는 상태 */
  IN_PROGRESS = "IN_PROGRESS",
}

export type ScreenProps = StackScreenProps<RootStackParamList, "ToolBar">;

const DailyQuizRouter = ({ navigation }: ScreenProps) => {
  const [COLOR, mode] = useThemeStyle();
  const [stage, setStage] = useState(0);
  const [quizState, setQuizState] = useState<string>(QuizState.NOT_STARTED);
  const [retakeTime, setRetakeTime] = useState("");

  const CurStage = STAGES[stage];

  useEffect(() => {
    AsyncStorage.getItem("quiz_state")
      .then((value) => {
        if (value) setQuizState(value);
      })
      .catch((err) => console.log(err));

    AsyncStorage.getItem("retake_time")
      .then((value) => {
        if (value && !isTimeExpired(value)) {
          setRetakeTime(value);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container COLOR={COLOR} mode={mode}>
      <CurStage navigate={() => navigation.navigate("QuizIntro")} />
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

export default DailyQuizRouter;
