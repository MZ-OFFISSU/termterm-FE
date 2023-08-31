import {
  FolderDetail,
  FolderPreview,
  EditFolder,
  UserFolderList,
  CreateFolder,
  FolderInfo,
  FolderModal,
  CancelArchive,
  RandomTerms,
} from "Folder";
import { get, post, put, remove } from "./AxiosCreate";

class FolderApi {
  /** 폴더 삭제 */
  removeFolder = async (id: number): Promise<string> => {
    const data = await remove<string>(`/v1/folder/${id}`);
    return data;
  };

  /** 폴더 상세 페이지_하나씩 보기 */
  getEachFolderDetail = async (id: number): Promise<FolderDetail[]> => {
    const data = await get<FolderDetail[]>(`/v1/folder/detail/each/${id}`);
    return data;
  };

  /** 폴더 상세 페이지_모아서 보기 */
  getSumFolderDetail = async (id: number): Promise<FolderPreview> => {
    const data = await get<FolderPreview>(`/v1/folder/detail/sum/${id}`);
    return data;
  };

  /** 폴더 정보 수정 */
  putFolderInfo = async (folderInfo: EditFolder): Promise<string> => {
    const data = await put<string>(`/v1/folder/info`, folderInfo);
    return data;
  };

  /** 내 폴더 리스트 */
  getMyFolderList = async (): Promise<UserFolderList[]> => {
    const data = await get<UserFolderList[]>(`/v1/folder/list`);
    return data;
  };

  /** 폴더 생성 */
  registerFolder = async (folderInfo: CreateFolder): Promise<FolderInfo> => {
    const data = await post<FolderInfo>(`/v1/folder/new`, folderInfo);
    return data;
  };

  /** 폴더 관련 정보 모달 */
  getFolderModal = async (): Promise<FolderModal> => {
    const data = await get<FolderModal>(`/v1/folder/related-info`);
    return data;
  };

  /** 폴더에 용어 저장 (아카이빙) */
  registerTermInFolder = async (
    folderIds: number[],
    termId: number
  ): Promise<string> => {
    const data = await post<string>(`/v1/folder/term`, { folderIds, termId });
    return data;
  };

  /** 폴더에 용어 삭제 (아카이빙 해제) */
  // removeTermInFolder = async (
  //   cancelArchiveInfo: CancelArchive
  // ): Promise<string> => {
  //   const data = await remove<string>(`/v1/folder/term`, cancelArchiveInfo);
  //   return data;
  // };

  /** 홈 화면 - 아카이빙 한 단어들 중 10개를 랜덤으로 뽑아 리턴 */
  getRandomArchiveTerms = async (): Promise<RandomTerms[]> => {
    const data = await get<RandomTerms[]>(`/v1/folder/term/random-10`);
    return data;
  };
}

export default FolderApi;
