import { QuizAnswerResult, QuizReviewDetail, QuizStatus } from "Quiz";
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

/**
 * 퀴즈 풀이 여부 관련 전역 상태
 */
export interface MemberQuizSolveState {
  quizSolveState: QuizStatus;
}

const defaultSolveState: MemberQuizSolveState = {
  quizSolveState: {
    status: "NOT_STARTED",
  },
};

export const memberQuizSolveState = atom<MemberQuizSolveState | null>({
  key: "memberQuizSolveState",
  default: null,
});

/**
 * 퀴즈 제출 시 받아오는 값 관련 전역변수
 */
const defaultQuizAnswer: QuizAnswerResult = {
  termId: 0,
  termName: "",
  termDescription: "",
  memberSelectedTermName: "",
  isAnswerRight: true,
  statusCode: 0,
};

export const eachQuizAnswerResult = atom<QuizAnswerResult>({
  key: "eachQuizAnswerResult",
  default: defaultQuizAnswer,
});

/**
 * 퀴즈 리뷰에서 사용할 전역 변수
 */
const defaultQuizReviewList: QuizReviewDetail[] = [
  {
    bookmarked: "NO",
    isAnswerRight: false,
    termDescription: "",
    termId: 0,
    termName: "",
    termSource: "",
    wrongChoices: [],
  },
];

export const quizReviewList = atom<QuizReviewDetail[]>({
  key: "quizReviewList",
  default: defaultQuizReviewList,
});
