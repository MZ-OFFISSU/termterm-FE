import QuizApi from "@api/QuizApi";
import { QuizDetail, QuizReviewDetail, QuizResult, QuizSubmit } from "Quiz";
import { useEffect, useState } from "react";

/**
 * 퀴즈 관리 훅
 */
export const useQuiz = () => {
  const quizApi = new QuizApi();
  const [dailyQuizItem, setDailyQuizItem] = useState<QuizDetail[]>();
  const [finalQuizReviewItem, setFinalQuizReviewItem] =
    useState<QuizReviewDetail[]>();
  const [reviewQuizItem, setReviewQuizItem] = useState<QuizDetail[]>();
  const [quizStatus, setQuizStatus] = useState<string>();

  /** 데일리 퀴즈 */
  const getDailyQuizInfo = async (): Promise<boolean> => {
    try {
      const res = await quizApi.getDailyQuiz();
      setDailyQuizItem(res);
      // console.log("dailyQuizItem : ", dailyQuizItem);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 용어 퀴즈 리뷰 */
  const getFinalQuizReviewInfo = async (): Promise<boolean> => {
    try {
      const res = await quizApi.getFinalQuizReview();
      setFinalQuizReviewItem(res);
      // console.log("finalQuizReviewItem : ", finalQuizReviewItem);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 데일리/복습 퀴즈 결과 제출 */
  const registerQuizResultInfo = async (resultData: QuizSubmit): Promise<boolean> => {
    try {
      await quizApi.registerQuizResult(resultData);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 용어 복습 퀴즈 */
  const getReviewQuizInfo = async (): Promise<boolean> => {
    try {
      const res = await quizApi.getReviewQuiz();
      setReviewQuizItem(res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 데일리 퀴즈 응시 여부 - 홈 화면 */
  const getDailyQuizStatus = async (): Promise<boolean> => {
    try {
      const res = await quizApi.getDailyQuizStatus();
      // console.log("quizStatus in hook : ", res);
      setQuizStatus(res.status);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    getDailyQuizInfo();
    getReviewQuizInfo();
    getFinalQuizReviewInfo();
  }, []);

  return {
    dailyQuizItem,
    finalQuizReviewItem,
    reviewQuizItem,
    quizStatus,
    getDailyQuizInfo,
    getDailyQuizStatus,
    getFinalQuizReviewInfo,
    getReviewQuizInfo,
    registerQuizResultInfo,
  };
};
