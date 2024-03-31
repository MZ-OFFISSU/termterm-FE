import {
  SearchResult,
  TermConfig,
  TermDetail,
  TermItem,
  TermResponse,
} from "Term";
import { get, post, put } from "./AxiosCreate";
import { AxiosRequestConfig } from "axios";

class TermApi {
  /** 용어 북마크 (임시)*/
  bookmarkTerm = async (id: number): Promise<string> => {
    const data = await post<string>(`/v2/s/term/bookmark/${id}`);
    return data;
  };

  /** 오늘의 용어*/
  dailyTerm = async (): Promise<TermItem[]> => {
    const data = await get<TermItem[]>(`/v2/s/term/daily`);
    return data;
  };

  /** 용어 상세 */
  termDetail = async (id: number): Promise<TermDetail> => {
    const data = await get<TermDetail>(`/v2/s/term/detail/${id}`);
    return data;
  };

  /** 전체용어 리스트 */
  allTermList = async (
    categories: TermConfig,
    config?: AxiosRequestConfig
  ): Promise<TermResponse> => {
    const data = await post<TermResponse>(`/v2/s/term/list`, categories, config);
    return data;
  };

  /** 용어 검색 */
  searchTerm = async (token: string): Promise<SearchResult[]> => {
    const data = await get<SearchResult[]>(`/v2/s/term/search/${token}`);
    return data;
  };
}

export default TermApi;
