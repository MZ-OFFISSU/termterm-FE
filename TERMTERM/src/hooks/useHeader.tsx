import { useRecoilState } from "recoil";
import { iconHeaderState } from "@recoil/iconHeaderState";
import { useFocusEffect } from "@react-navigation/native";

export function useHeader() {
  const [headerState, setHeaderState] = useRecoilState(iconHeaderState);

  /**
   * 전체 인덱스를 수정하는 함수
   */
  const settingMax = (idx: number) => {
    const newHeaderState = {
      ...headerState,
      maxNum: idx,
    };

    setHeaderState(newHeaderState);
  };

  /**
   * 현재 인덱스를 수정하는 함수
   */
  const settingIdx = (idx: number) => {
    const newHeaderState = {
      ...headerState,
      curNum: idx,
    };

    setHeaderState(newHeaderState);
  };

  /**
   * 북마크 핸들러
   */
  const bookmarkHandler = () => {
    const newHeaderState = {
      ...headerState,
      bookmarked: !headerState.bookmarked,
    };

    setHeaderState(newHeaderState);
  };

  return {
    headerState,
    settingIdx,
    settingMax,
    bookmarkHandler,
    setHeaderState,
  };
}
