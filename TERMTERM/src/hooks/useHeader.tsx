import { useRecoilState } from "recoil";
import { iconHeaderState } from "@recoil/iconHeaderState";

export function useHeader() {
  const [headerState, setHeaderState] = useRecoilState(iconHeaderState);

  /**
   * 전체 인덱스를 수정하는 함수
   */
  const settingMax = (idx: number) => {
    setHeaderState((prev) => {
      return {
        ...prev,
        maxNum: idx,
      };
    });
  };

  /**
   * 현재 인덱스를 수정하는 함수
   */
  const settingIdx = (idx: number) => {
    setHeaderState((prev) => {
      return {
        ...prev,
        curNum: idx,
      };
    });
  };

  /**
   * 북마크 핸들러
   */
  const bookmarkHandler = () => {
    setHeaderState((prev) => {
      return {
        ...prev,
        bookmarked: !prev.bookmarked,
      };
    });
  };

  return {
    headerState,
    settingIdx,
    settingMax,
    bookmarkHandler,
    setHeaderState,
  };
}
