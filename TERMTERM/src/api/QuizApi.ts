import { QuizDetail, QuizReviewDetail, QuizStatus, QuizSubmit } from "Quiz";

import { post, get } from "./AxiosCreate";

class QuizApi {
  /** 데일리 퀴즈 */
  getDailyQuiz = async (): Promise<QuizDetail[]> => {
    const data = await get<QuizDetail[]>(`/v1/quiz/daily`);
    return data;
  };

  /** 용어 퀴즈 리뷰 */
  getFinalQuizReview = async (): Promise<QuizReviewDetail[]> => {
    const data = await get<QuizReviewDetail[]>(`/v1/quiz/final-quiz-review`);
    return data;
  };

  /** 데일리/복습 퀴즈 결과 제출 */
  registerQuizResult = async (): Promise<QuizSubmit> => {
    const data = await post<QuizSubmit>(`/v1/quiz/result`);
    return data;
  };

  /** 용어 복습 퀴즈 */
  getReviewQuiz = async (): Promise<QuizDetail[]> => {
    const data = await get<QuizDetail[]>(`/v1/quiz/review`);
    return data;
  };

  /** 데일리 퀴즈 응시 여부 - 홈 화면 */
  getDailyQuizStatus = async (): Promise<QuizStatus> => {
    const data = await get<QuizStatus>(`/v1/quiz/status`);
    return data;
  };
}

export default QuizApi;
