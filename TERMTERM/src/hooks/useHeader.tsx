import { useRecoilState } from "recoil";
import {
  bookmarkArrayState,
  iconHeaderState,
  termIdArrayState,
} from "@recoil/iconHeaderState";

export function useHeader() {
  const [headerState, setHeaderState] = useRecoilState(iconHeaderState);
  const [bookmarkArray, setBookmarkArray] = useRecoilState(bookmarkArrayState);
  const [termIdArray, setTermIdArray] = useRecoilState(termIdArrayState);

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

  const settingBookmarkArray = (length: number) => {
    setBookmarkArray(new Array(length).fill(true));
  };

  const settingBookmarkArrayByIndex = (index: number, custom: boolean) => {
    const newBookmarkArray = bookmarkArray.map((bookmark, idx) =>
      idx === index ? custom : bookmark
    );
    setBookmarkArray(newBookmarkArray);
  };

  const settingTermsArray = (ids: number[]) => {
    setTermIdArray(ids);
  };

  return {
    headerState,
    settingIdx,
    settingMax,
    bookmarkHandler,
    setHeaderState,
    settingBookmarkArray,
    bookmarkArray,
    settingTermsArray,
    termIdArray,
    settingBookmarkArrayByIndex,
  };
}
