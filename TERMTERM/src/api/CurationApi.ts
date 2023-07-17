import {
  Category,
  CreateCuration,
  CurationDetail,
  CurationPreview,
} from "Curation";
import { get, post, put } from "./AxiosCreate";

class CurationApi {
  /** 아카이브한 큐레이션 리스트 */
  getArchivedCuration = async (): Promise<CurationPreview[]> => {
    const data = await get<CurationPreview[]>(`/v1/curation/archived`);
    return data;
  };

  /** 특정 큐레이션 북마크하기 */
  curationBookmark = async (id: number): Promise<string> => {
    const data = await put<string>(`/v1/curation/bookmark/${id}`);
    return data;
  };

  /** 특정 큐레이션의 상세 정보 */
  getCurationDetail = async (id: number): Promise<CurationDetail> => {
    const data = await get<CurationDetail>(`/v1/curation/detail/${id}`);
    return data;
  };

  /** 카테고리별 큐레이션 리스트 */
  getCurationListByCategory = async (
    category: Category
  ): Promise<CurationPreview[]> => {
    const data = await get<CurationPreview[]>(`/v1/curation/list`, {
      params: {
        category: category,
      },
    });
    return data;
  };

  /** 큐레이션 등록 */
  registerCuration = async (content: CreateCuration): Promise<string> => {
    const data = await post<string>(`/v1/curation/register`, content);
    return data;
  };

  /** 큐레이션 북마크 소 */
  cancelBookmarkCuration = async (id: number): Promise<string> => {
    const data = await put<string>(`/v1/curation/unbookmark/${id}`);
    return data;
  };
}

export default CurationApi;
