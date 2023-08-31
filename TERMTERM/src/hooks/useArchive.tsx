import FolderApi from "@api/FolderApi";
import { WordProps } from "@interfaces/word";
import { useEffect, useMemo, useState } from "react";
import { useFolder } from "./useFolder";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useHaptics } from "./useHaptics";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useThemeStyle } from "./useThemeStyle";
import { FolderDetail, FolderPreview } from "Folder";
import { useRecoilState } from "recoil";
import { folderInfoState } from "@recoil/folderInfoState";

export const useArchive = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const folderApi = new FolderApi();
  const { myFolderList, getUsersFolderList } = useFolder();
  const { haptic } = useHaptics();
  const [COLOR, mode] = useThemeStyle();
  const [folderInfo, setFolderInfo] = useRecoilState(folderInfoState);

  const [archivedWords, setArchivedWords] = useState<Array<WordProps> | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedFolders, setSelectedFolders] = useState<number[]>([]);
  const [termsSum, setTermsSum] = useState<FolderPreview[]>([]);
  const [termsEach, setTermsEach] = useState<FolderDetail[]>([]);

  const getArchiveListInHome = async () => {
    try {
      const data = await folderApi.getRandomArchiveTerms();
      setArchivedWords(data);
    } catch (err) {
      console.log(err);
    }
  };

  const archiveTerm = (termId: number) => {
    if (!myFolderList || myFolderList!.length === 0) setIsModalOpen(true);
    else navigation.push("SelectFolder", { termId });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToFolderMake = () => {
    navigation.navigate("Archive");
    setIsModalOpen(false);
  };

  const handleSelectFolder = (folderId: number) => {
    haptic("light");
    if (selectedFolders.includes(folderId))
      setSelectedFolders((prev) =>
        prev.filter((prevFid) => prevFid !== folderId)
      );
    else setSelectedFolders((prev) => [...prev, folderId]);
  };

  const handleArchive = async (termId: number) => {
    try {
      await folderApi.registerTermInFolder(selectedFolders, termId);

      Toast.show({
        type: mode ? "light" : "dark",
        text1:
          "용어가 아카이빙 되었어요!\n아카이브에서 용어를 편하게 찾아보세요",
      });

      navigation.pop();
    } catch (err) {
      console.log(err);
    }
  };

  const getTermsSuminFolder = async (folderId: number) => {
    try {
      const res = await folderApi.getSumFolderDetail(folderId);
      setTermsSum(res);
    } catch (err) {
      console.log(err);
    }
  };

  /** 캐러셀 */
  const getTermsEachInFolder = async (folderId: number) => {
    try {
      const res = await folderApi.getEachFolderDetail(folderId);
      setTermsEach(res);
    } catch (err) {
      console.log(err);
    }
  };

  const saveFolderInfo = (name: string, desc: string) => {
    setFolderInfo({
      name,
      desc,
    });
  };

  useEffect(() => {
    getUsersFolderList();
  }, []);

  return {
    archivedWords,
    getArchiveListInHome,
    archiveTerm,
    closeModal,
    isModalOpen,
    goToFolderMake,
    handleSelectFolder,
    myFolderList,
    selectedFolders,
    handleArchive,
    getTermsEachInFolder,
    getTermsSuminFolder,
    termsSum,
    termsEach,
    saveFolderInfo,
    folderInfo,
  };
};
