import QuizApi from "@api/QuizApi";
import { quizState } from "@recoil/quizState";
import {
  QuizDetail,
  QuizReviewDetail,
  QuizResult,
  QuizSubmit,
  QuizAnswerResult,
} from "Quiz";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

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
  const [quizResultData, setQuizResultData] = useState<QuizAnswerResult>();
  const curr = useRecoilValue(quizState);
  const { currIdx, currReviewIdx, totalIdx, totalReviewIdx } = curr;

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
  const registerQuizResultInfo = async (
    apiUrl: string,
    resultData: QuizSubmit
  ): Promise<QuizAnswerResult | null> => {
    try {
      const data = await quizApi.registerQuizResult(apiUrl, resultData);
      //console.log("curr.currReviewIdx:", curr.currReviewIdx, "curr.totalReviewIdx: ", curr.totalReviewIdx);
      //console.log("퀴즈 요청 성공", apiUrl, resultData, data);
      setQuizResultData(data);
      return data;
    } catch (err) {
      console.log(err);
      return null;
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
    quizResultData,
    getDailyQuizInfo,
    getDailyQuizStatus,
    getFinalQuizReviewInfo,
    getReviewQuizInfo,
    registerQuizResultInfo,
    setQuizStatus,
  };
};
