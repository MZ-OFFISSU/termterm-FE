import { atom } from "recoil";

/** 북마크 헤더 관련 상태 */
export const bookmarkHeaderState = atom<boolean>({
  key: "bookmarkHeaderState",
  default: false,
});

/** 북마크 헤더 모달 상태 */
export const bookmarkModalInfo = atom<boolean>({
  key: "bookmarkModalInfo",
  default: false,
});

/** 북마크 아이디 관련 상태 */
export const bookmarkTermId = atom<number>({
  key: "bookmarkTermId",
  default: 0,
});

/** 북마크 헤더가 큐레이션 스크린인가? */
export const isBookmarkCuration = atom<number>({
  key: "isBookmarkCuration",
  default: 0,
});
