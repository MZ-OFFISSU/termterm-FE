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
import { useRecoilValue } from "recoil";
import { quizState } from "@recoil/quizState";

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

/**
 * 용어퀴즈 시작 가능
 */
const Start = ({ navigate }: ChildrenProps) => {
  const quizApi = new QuizApi();
  const [COLOR, mode] = useThemeStyle();
  const [quizStatus, setQuizStatus] = useState<string>(QuizState.NOT_STARTED);
  const [countdown, setCountdown] = useState(20);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const curr = useRecoilValue(quizState);
  const { currIdx } = curr

  const remindQuizStatus = async () => {
    try {
      const res = await quizApi.getDailyQuizStatus();
      // TODO : 값 바꿔두기
      // setQuizState(res.status);
      setQuizStatus(QuizState.NOT_STARTED)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    remindQuizStatus();
    let interval: NodeJS.Timer;
    if (quizStatus === QuizState.IN_PROGRESS) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [quizStatus]);

  return (
    <>
      {quizStatus === QuizState.NOT_STARTED && currIdx <= 5 && (
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

      {quizStatus === QuizState.IN_PROGRESS && (
        <>
          {countdown > 0 ? (
            <>
              <AutoSizedImage
                source={require("@assets/clock.png")}
                width={24}
              />
              <Title COLOR={COLOR} style={{ marginLeft: 5 }}>
                {`${Math.floor(countdown / 60)}:${String(
                  countdown % 60
                ).padStart(2, "0")} 후 용어 복습 퀴즈를 응시할 수 있어요.`}
              </Title>
            </>
          ) : (
            <>
              <AutoSizedImage source={require("@assets/test.png")} width={24} />
              <Title COLOR={COLOR} style={{ marginLeft: 5 }}>
                용어 복습 퀴즈를 통해 다시 학습해요!
              </Title>
              <TouchableOpacity onPress={() => navigation.push("ReviewQuizIntro")}>
                <AutoSizedImage
                  source={require("@assets/arrow-button.png")}
                  width={40}
                />
              </TouchableOpacity>
            </>
          )}
        </>
      )}

      {quizStatus === QuizState.COMPLETED && (
        <Clear navigate={() => navigation.push("ReviewQuizIntro")} />
      )}
    </>
  );
};

export default Start;
