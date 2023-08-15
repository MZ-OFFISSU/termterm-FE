import TermApi from "@api/TermApi";
import { useEffect, useState } from "react";
import { TermConfig, TermDetail, TermItem, TermResponse } from "Term";

/**
 * Term 관리 훅
 */
export const useTerm = () => {
  const termApi = new TermApi();
  const [dailyTermList, setDailyTermList] = useState<TermItem[]>([]);
  const [termDetail, setTermDetail] = useState<TermDetail>();
  const [totalTermRes, setTotalTermRes] = useState<TermResponse>();
  const [totalTermList, setTotalTermList] = useState<TermItem[]>([]);

  /** 용어 북마크(임시) */
  const bookmarkingTerm = async (termId: number): Promise<boolean> => {
    try {
      const res = await termApi.bookmarkTerm(termId);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 오늘의 용어 4개 받아오기 */
  const getDailyTerm = async (): Promise<boolean> => {
    try {
      const res = await termApi.dailyTerm();
      setDailyTermList(res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 용어 상세 정보 받아오기 */
  const getTermDetail = async (termId: number): Promise<boolean> => {
    try {
      const res = await termApi.termDetail(termId);
      setTermDetail(res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 전체 용어 리스트 받아오기 */
  const getAllTermList = async (config: TermConfig): Promise<boolean> => {
    try {
      const res = await termApi.allTermList(config);
      setTotalTermList(res.content);
      console.log(res.content);
      setTotalTermRes(res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return {
    bookmarkingTerm,
    dailyTermList,
    getDailyTerm,
    termDetail,
    totalTermRes,
    setTotalTermList,
    totalTermList,
    getTermDetail,
    getAllTermList,
  };
};
