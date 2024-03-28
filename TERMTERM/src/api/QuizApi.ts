import { QuizAnswerResult, QuizDetail, QuizReviewDetail, QuizStatus, QuizSubmit } from "Quiz";

import { post, get } from "./AxiosCreate";

class QuizApi {
  /** 데일리 퀴즈 */
  getDailyQuiz = async (): Promise<QuizDetail[]> => {
    const data = await get<QuizDetail[]>(`/v2/s/quiz/daily`);
    return data;
  };

  /** 용어 퀴즈 리뷰 */
  getFinalQuizReview = async (): Promise<QuizReviewDetail[]> => {
    const data = await get<QuizReviewDetail[]>(`/v2/s/quiz/final-quiz-review`);
    return data;
  };

  /** 데일리/복습 퀴즈 결과 제출 */
  registerQuizResult = async (apiUrl: string, input: QuizSubmit): Promise<QuizAnswerResult> => {
    const data = await post<QuizAnswerResult>(apiUrl, input);
    return data;
  };

  /** 용어 복습 퀴즈 */
  getReviewQuiz = async (): Promise<QuizDetail[]> => {
    const data = await get<QuizDetail[]>(`/v2/s/quiz/review`);
    return data;
  };

  /** 데일리 퀴즈 응시 여부 - 홈 화면 */
  getDailyQuizStatus = async (): Promise<QuizStatus> => {
    const data = await get<QuizStatus>(`/v2/s/quiz/status`);
    return data;
  };
}

export default QuizApi;
