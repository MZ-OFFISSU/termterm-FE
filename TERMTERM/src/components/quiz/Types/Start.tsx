import { TouchableOpacity } from "react-native-gesture-handler";
import AutoSizedImage from "@components/common/AutoSizedImage";
import { useThemeStyle } from "@hooks/useThemeStyle";
import { ChildrenProps, LeftBox, Title } from "./common";
import { useEffect, useState } from "react";
import QuizApi from "@api/QuizApi";

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
  const [quizState, setQuizState] = useState<string>(QuizState.NOT_STARTED);
  const [countdown, setCountdown] = useState(180);

  const remindQuizStatus = async () => {
    try {
      const res = await quizApi.getDailyQuizStatus();
      setQuizState(res);
      // console.log(res, quizState);
    } catch (err) {
      console.log(err);
    }
  };

  const startCountdown = (seconds: number) => {
    setCountdown(seconds);
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setCountdown(0);
    }, seconds * 1000);
  };

  useEffect(() => {
    remindQuizStatus();
  }, [quizState]);

  useEffect(() => {
    // TODO : 디버깅 이후 QuizState 변경
    if (quizState === QuizState.NOT_STARTED) {
      if (countdown > 0) {
        startCountdown(180);
      } else {
        setCountdown(0);
      }
    }
  }, [quizState, countdown]);

  return (
    <>
      <LeftBox>
        {/* TODO : 디버깅 후 값 바꿔두기 */}
        <AutoSizedImage source={require("@assets/test.png")} width={24} />
        <Title COLOR={COLOR} style={{ marginLeft: 5 }}>
          {`${Math.floor(countdown / 60)}:${String(countdown % 60).padStart(
            2,
            "0"
          )} 후 용어 복습 퀴즈를 응시할 수 있어요.`}
        </Title>
        {quizState === QuizState.NOT_STARTED && (
          <>
            <AutoSizedImage source={require("@assets/test.png")} width={24} />
            <Title COLOR={COLOR} style={{ marginLeft: 5 }}>
              Daily 용어 퀴즈를 시작해 볼까요?
            </Title>
          </>
        )}

        {quizState === QuizState.IN_PROGRESS && (
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
                <AutoSizedImage
                  source={require("@assets/test.png")}
                  width={24}
                />
                <Title COLOR={COLOR} style={{ marginLeft: 5 }}>
                  용어 복습 퀴즈를 통해 다시 학습해요!
                </Title>
              </>
            )}
          </>
        )}

        {quizState === QuizState.COMPLETED && (
          <Title COLOR={COLOR} style={{ marginLeft: 5 }}>
            정말 잘 하셨어요! 내일 다시 만나요 🙌🏻
          </Title>
        )}
      </LeftBox>
      <TouchableOpacity onPress={() => navigate()}>
        <AutoSizedImage
          source={
            mode
              ? require("@assets/arrow-button.png")
              : require("@assets/arrow-button-dark.png")
          }
          width={40}
        />
      </TouchableOpacity>
    </>
  );
};

export default Start;
