import TermApi from "@api/TermApi";
import { dailyTermState } from "@recoil/dailyTermsState";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  TermConfig,
  TermDetail,
  TermItem,
  TermResponse,
  SearchResult,
} from "Term";

const SIZE_PER_PAGE = 20;

/**
 * Term 관리 훅
 */
export const useTerm = () => {
  const termApi = new TermApi();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [dailyTermList, setDailyTermList] = useRecoilState(dailyTermState);
  const [termDetail, setTermDetail] = useState<TermDetail>();
  const [totalTermRes, setTotalTermRes] = useState<TermResponse>();
  const [totalTermList, setTotalTermList] = useState<TermItem[]>([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

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
  const getAllTermList = async (
    categories: TermConfig,
    page: number
  ): Promise<boolean> => {
    if (isLastPage) return false;
    try {
      const res = await termApi.allTermList(categories, {
        params: {
          page: page,
          size: SIZE_PER_PAGE,
        },
      });
      setTotalTermList((prev) => [...prev, ...res.content]);
      setTotalTermRes(res);
      setPage(page + 1);
      if (res.last || res.empty) return false;
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 용어 검색하기 */
  const searchTerm = async (keyword: string) => {
    try {
      const termList = await termApi.searchTerm(keyword);
      setResults(termList);
    } catch (err) {
      console.log(err);
      setResults([]);
    }
  };

  const bookmarkTerm = async (id: number) => {
    try {
      await termApi.bookmarkTerm(id);
    } catch (err) {
      console.log(err);
    }
  };

  const initializePage = () => {
    setTotalTermList([]);
    setPage(0);
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
    results,
    searchTerm,
    bookmarkTerm,
    page,
    initializePage,
  };
};
