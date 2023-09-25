import { atom } from "recoil";

/**
 * 퀴즈 관련 전역 상태
 */
export interface QuizState {
  totalIdx: number;
  currIdx: number;
  currReviewIdx: number;
  totalReviewIdx: number;
}

const defaultState: QuizState = {
  totalIdx: 5,
  currIdx: 0,
  currReviewIdx: 0,
  totalReviewIdx: 0,
};

export const quizState = atom<QuizState>({
  key: "quizState",
  default: defaultState,
});
