import TermApi from "@api/TermApi";
import { SearchResult, TermConfig, TermResponse } from "Term";
import { useState } from "react";

export const useTerm = () => {
  const termApi = new TermApi();
  const [results, setResults] = useState<SearchResult[]>([]);

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

  return { results, searchTerm, bookmarkTerm };
};
