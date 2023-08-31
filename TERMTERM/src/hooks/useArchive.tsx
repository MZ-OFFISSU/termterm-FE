import FolderApi from "@api/FolderApi";
import { WordProps } from "@interfaces/word";
import { useState } from "react";

export const useArchive = () => {
  const folderApi = new FolderApi();
  const [archivedWords, setArchivedWords] = useState<Array<WordProps> | null>();

  const getArchiveListInHome = async () => {
    try {
      const data = await folderApi.getRandomArchiveTerms();
      setArchivedWords(data);
    } catch (err) {
      console.log(err);
    }
  };

  return { archivedWords, getArchiveListInHome };
};
