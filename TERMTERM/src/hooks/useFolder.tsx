import FolderApi from "@api/FolderApi";
import {
  CancelArchive,
  CreateFolder,
  EditFolder,
  FolderDetail,
  UserFolderList,
  FolderModal,
  FolderPreview,
  RandomTerms,
} from "Folder";
import { useEffect, useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useThemeStyle } from "./useThemeStyle";
/**
 * 폴더 API 관련 훅
 */
export const useFolder = () => {
  const folderApi = new FolderApi();
  const [COLOR, mode] = useThemeStyle();
  const [termDetailInFolder, setTermDetailInFolder] =
    useState<FolderDetail[]>();
  const [termPreviewInFolder, setTermPreviewInFolder] =
    useState<FolderPreview>();
  const [myFolderList, setMyFolderList] = useState<UserFolderList[]>();
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
      console.log("get Term Detail in Folder : ", res);
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
      console.log("폴더 정보 수정 값 / 결과 : ", input, res);
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
      return true;
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
      console.log("folder info modal - success : ", res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  /** 폴더에 용어 저장하기(아카이빙하기) */
  const saveTermInFolder = async (folderIds: number[]): Promise<boolean> => {
    try {
      await folderApi.registerTermInFolder(folderIds);
      console.log("폴더에 용어 저장 완료 : ", folderIds);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  /** 폴더에 용어 삭제하기(아카이빙 해제하기) */
  const deleteTermInFolder = async (
    cancelArchiveInfo: CancelArchive
  ): Promise<boolean> => {
    try {
      await folderApi.removeTermInFolder(cancelArchiveInfo);
      console.log("폴더에 용어 삭제 완료 : ", cancelArchiveInfo);
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
      console.log("아카이빙 한 용어 10개 리턴 : ", res, archived10Terms);
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
    saveTermInFolder,
    deleteTermInFolder,
    getArchived10Terms,
    archived10Terms,
  };
};
