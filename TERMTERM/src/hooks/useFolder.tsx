import FolderApi from "@api/FolderApi";
import {
  CreateFolder,
  EditFolder,
  FolderDetail,
  FolderModal,
  FolderPreview,
  RandomTerms,
} from "Folder";
import { useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useThemeStyle } from "./useThemeStyle";
import { useRecoilState } from "recoil";
import { folderState } from "@recoil/folderState";
import PointApi from "@api/PointApi";
/**
 * 폴더 API 관련 훅
 */
export const useFolder = () => {
  const folderApi = new FolderApi();
  const pointApi = new PointApi();

  const [COLOR, mode] = useThemeStyle();
  const [termDetailInFolder, setTermDetailInFolder] =
    useState<FolderDetail[]>();
  const [termPreviewInFolder, setTermPreviewInFolder] =
    useState<FolderPreview>();
  const [myFolderList, setMyFolderList] = useRecoilState(folderState);
  const [folderInfoModal, setFolderInfoModal] = useState<FolderModal>();
  const [archived10Terms, setArchived10Terms] = useState<RandomTerms[]>();

  const successToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1: "폴더 생성이 완료되었어요!",
    });
  };
  const failedToast = () => {
    Toast.show({
      type: mode ? "light" : "dark",
      text1: "폴더 생성을 실패했어요.",
    });
  };
  /** 폴더 삭제하기 */
  const deleteFolder = async (folderId: number): Promise<boolean> => {
    try {
      await folderApi.removeFolder(folderId);
      console.log("folder delete success");
      await getUsersFolderList();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  /** 폴더 내에 담겨있는 용어 상세 정보 가져오기 - FolderDetail 리턴 */
  const getTermDetailInFolder = async (folderId: number): Promise<boolean> => {
    try {
      const res = await folderApi.getEachFolderDetail(folderId);
      setTermDetailInFolder(res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  /** 폴더 내에 담겨있는 용어들 가져오기 - FolderPreview 리턴 */
  const getTermPreviewInFolder = async (folderId: number): Promise<boolean> => {
    try {
      const res = await folderApi.getSumFolderDetail(folderId);
      setTermPreviewInFolder(res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  /** 폴더 정보 수정하기 */
  const editFolderInfo = async (input: EditFolder): Promise<boolean> => {
    try {
      const res = await folderApi.putFolderInfo(input);
      await getUsersFolderList();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  /** 내 폴더 리스트 가져오기 */
  const getUsersFolderList = async (): Promise<boolean> => {
    try {
      const res = await folderApi.getMyFolderList();
      setMyFolderList(res);
      if (res && res.length > 0) return true;
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  /** 폴더 생성하기 */
  const createFolder = async (input: CreateFolder) => {
    try {
      const config: CreateFolder = {
        description: input.description,
        title: input.title,
      };
      await folderApi.registerFolder({
        description: config.description,
        title: config.title,
      });
      await getUsersFolderList();
      successToast();
    } catch (err) {
      console.log(err);
      failedToast();
    }
  };
  /** 폴더와 관련된 정보 모달 가져오기 */
  const getFolderInfoModal = async (): Promise<boolean> => {
    try {
      const res = await folderApi.getFolderModal();
      setFolderInfoModal(res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 홈 화면 - 아카이빙한 용어 중 10개 랜덤으로 뽑아 가져오기 */
  const getArchived10Terms = async (): Promise<boolean> => {
    try {
      const res = await folderApi.getRandomArchiveTerms();
      setArchived10Terms(res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  /** 폴더 개수 하나 늘리기 */
  const buyFolderOne = async () => {
    try {
      await pointApi.buyFolder();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return {
    successToast,
    failedToast,
    deleteFolder,
    getTermDetailInFolder,
    termDetailInFolder,
    getTermPreviewInFolder,
    termPreviewInFolder,
    editFolderInfo,
    getUsersFolderList,
    myFolderList,
    createFolder,
    getFolderInfoModal,
    folderInfoModal,
    getArchived10Terms,
    archived10Terms,
    buyFolderOne,
  };
};
