import { useState } from "react";
import { useInterval } from "./useInterval";

export type Countdown = {
  min: string;
  sec: string;
};

/**
 * 끝나는 시간을 입력하여, 남은 시간까지 몇분 몇초가 남았는지 반환하는 훅 (타이머)
 */
export function useTimer(timeString: string): Countdown {
  const [countdown, setCountdown] = useState<Countdown>({ min: "0", sec: "0" });

  const calculateCountdown = () => {
    const targetTime = new Date(timeString).getTime();
    const currentTime = new Date().getTime();
    const remainingTime = targetTime - currentTime;

    if (remainingTime <= 0) {
      setCountdown({ min: "0", sec: "0" });
    } else {
      const minutes = Math.floor(remainingTime / 1000 / 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);
      setCountdown({ min: minutes.toString(), sec: seconds.toString() });
    }
  };

  useInterval(calculateCountdown, 1000);

  return countdown;
}
