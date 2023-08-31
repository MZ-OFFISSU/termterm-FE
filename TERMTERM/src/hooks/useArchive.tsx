import FolderApi from "@api/FolderApi";
import { WordProps } from "@interfaces/word";
import { useEffect, useMemo, useState } from "react";
import { useFolder } from "./useFolder";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";
import { useHaptics } from "./useHaptics";

export const useArchive = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const folderApi = new FolderApi();
  const { myFolderList, getUsersFolderList } = useFolder();
  const { haptic } = useHaptics();

  const [archivedWords, setArchivedWords] = useState<Array<WordProps> | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedFolders, setSelectedFolders] = useState<number[]>([]);

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
  };
};
