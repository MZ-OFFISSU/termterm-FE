import { TouchableOpacity } from "react-native-gesture-handler";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { ChildrenProps, LeftBox, Title } from "./common";
import { useEffect, useState } from "react";
import QuizApi from "@api/QuizApi";
import Clear from "./Clear";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { memberQuizSolveState, quizState } from "@recoil/quizState";
import { QuizStatus } from "Quiz";
import { useInterval } from "@hooks/useInterval";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export interface MemberQuizSolveState {
  quizSolveState: QuizStatus;
}

/**
 * 용어퀴즈 시작 가능
 */
const Start = ({ navigate }: ChildrenProps) => {
  const quizApi = new QuizApi();
  const [COLOR, mode] = useThemeStyle();
  const [countdown, setCountdown] = useState(180);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const curr = useRecoilValue(quizState);
  const { currIdx, totalReviewIdx } = curr;
  const [quizStatus, setQuizStatus] = useRecoilState(memberQuizSolveState);

  /** 타이머 스탬프 받아오기 */
  const getTimerStamp = async () => {
    const stamp = await AsyncStorage.getItem("quiz_timer");
    if (stamp) setCountdown(Number(stamp));
  };

  /** 남은 타이머 시간 저장 */
  const saveTimerStamp = async (countdown: number) => {
    await AsyncStorage.setItem("quiz_timer", `${countdown}`);
  };

  /** 타이머 제거 */
  const removeTimerStamp = async () => {
    await AsyncStorage.removeItem("quiz_timer");
  };

  const remindQuizStatus = async () => {
    try {
      const res = await quizApi.getDailyQuizStatus();
      setQuizStatus({
        quizSolveState: {
          status: res.status,
        },
      });
      if (
        res.status === QuizState.NOT_STARTED ||
        res.status === QuizState.COMPLETED
      )
        removeTimerStamp();
    } catch (err) {
      console.log(err);
    }
  };

  useInterval(() => {
    if (
      quizStatus?.quizSolveState.status === QuizState.IN_PROGRESS &&
      countdown > 0
    ) {
      saveTimerStamp(countdown - 1);
      setCountdown((prevCountdown) => prevCountdown - 1);
    }
  }, 1000);

  useEffect(() => {
    if (
      quizStatus !== null &&
      quizStatus.quizSolveState.status === QuizState.IN_PROGRESS
    )
      getTimerStamp();
    else if (quizStatus !== null) removeTimerStamp();
  }, [quizStatus]);

  useEffect(() => {
    remindQuizStatus();
  }, []);

  return (
    <>
      {quizStatus?.quizSolveState.status === QuizState.NOT_STARTED &&
        currIdx <= 5 && (
          <>
            <AutoSizedImage source={require("@assets/test.png")} width={24} />
            <Title COLOR={COLOR} style={{ marginLeft: 5 }}>
              Daily 용어 퀴즈를 시작해 볼까요?
            </Title>
            <TouchableOpacity onPress={() => navigation.push("QuizIntro")}>
              <AutoSizedImage
                source={require("@assets/arrow-button.png")}
                width={40}
              />
            </TouchableOpacity>
          </>
        )}

      {quizStatus?.quizSolveState.status === QuizState.IN_PROGRESS && (
        <>
          {countdown > 0 ? (
            <>
              <AutoSizedImage
                source={require("@assets/clock.png")}
                width={24}
              />
              <Title COLOR={COLOR} style={{ marginLeft: 5 }}>
                {`${Math.floor(countdown / 60)}:${String(
                  Math.floor(countdown % 60)
                ).padStart(2, "0")} 후 용어 복습 퀴즈를 응시할 수 있어요.`}
              </Title>
            </>
          ) : (
            <>
              <AutoSizedImage source={require("@assets/test.png")} width={24} />
              <Title COLOR={COLOR} style={{ marginLeft: 5 }}>
                용어 복습 퀴즈를 통해 다시 학습해요!
              </Title>
              <TouchableOpacity
                onPress={() => navigation.push("ReviewQuizIntro")}
              >
                <AutoSizedImage
                  source={require("@assets/arrow-button.png")}
                  width={40}
                />
              </TouchableOpacity>
            </>
          )}
        </>
      )}

      {quizStatus?.quizSolveState.status === QuizState.COMPLETED && (
        <Clear navigate={() => navigation.push("QuizReview")} />
      )}
    </>
  );
};

export default Start;
