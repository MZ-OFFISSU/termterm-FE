import { HomeUxWriting, SubTitles } from "Home";
import { get, post, remove } from "./AxiosCreate";

class HomeApi {
  /** 서브타이틀 리스트 */
  getSubTitleList = async (): Promise<SubTitles> => {
    const data = await get<SubTitles>(`/v1/home/subtitle`);
    return data;
  };

  /** 서브타이틀 등록 (관리자용) */
  registerSubTitle = async (): Promise<string> => {
    const data = await post<string>(`/v1/home/subtitle`);
    return data;
  };

  /** 서브타이틀 삭제 (관리자용) */
  removeSubTitle = async (): Promise<string> => {
    const data = await remove<string>(`/v1/home/subtitle`);
    return data;
  };

  /** 홈 화면 상단 UX Writing */
  getUxWriting = async (): Promise<HomeUxWriting> => {
    const data = await get<HomeUxWriting>(`/v1/home/title`);
    return data;
  };
}

export default HomeApi;
