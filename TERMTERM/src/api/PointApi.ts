import { get, put } from "./AxiosCreate";
import { PointHistory } from "Point";

class PointApi {
  /** 현재 포인트 가져오기 */
  getCurPoint = async (): Promise<number> => {
    const data = await get<number>("/v1/point/current");
    return data;
  };

  /** (페이지네이션) 포인트 히스토리 조회 */
  getPointHistory = async (curPage: number): Promise<PointHistory> => {
    const data = await get<PointHistory>(
      `/v1/point/history?page=${curPage}&size=5`
    );
    return data;
  };

  /** 큐레이션 구매 */
  buyCuration = async (id: number) => {
    await put(`/v1/point/pay/curation/${id}`);
  };

  /** 폴더 한도 1개 추가 (폴더 구매) */
  buyFolder = async (id: number) => {
    await put(`/v1/point/pay/folder/${id}`);
  };
}

export default PointApi;
