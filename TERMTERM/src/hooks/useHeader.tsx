import { useRecoilState } from "recoil";
import { iconHeaderState, DEFAULT_VALUE } from "@recoil/iconHeaderState";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export function useHeader(id: number) {
  const [headerState, setHeaderState] = useRecoilState(iconHeaderState);

  useFocusEffect(
    useCallback(() => {
      /**헤더 값 초기화
       * api연동함수 추가
       */
      setHeaderState({
        id: id,
        curNum: 1,
        maxNum: 15,
        bookmarked: true,
      });
      return () => {
        setHeaderState(DEFAULT_VALUE);
      };
    }, [])
  );

  return headerState;
}
